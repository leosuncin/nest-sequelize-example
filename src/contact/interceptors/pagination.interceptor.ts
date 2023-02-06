import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { Request } from 'express';
import { map, Observable } from 'rxjs';

import { Paginate } from '../dto/paginate.dto';

interface PaginationMeta {
  /**
   * The amount of items on this specific page
   */
  itemCount: number;
  /**
   * The total amount of items
   */
  totalItems: number;
  /**
   * The amount of items that were requested per page
   */
  itemsPerPage: number;
  /**
   * the total amount of pages in this paginator
   */
  totalPages: number;
  /**
   * the current page this paginator "points" to
   */
  currentPage: number;
}

interface PaginationLinks {
  /**
   * a link to the "first" page
   */
  first: string;
  /**
   * a link to the "previous" page
   */
  previous?: string;
  /**
   * a link to the "next" page
   */
  next?: string;
  /**
   * a link to the "last" page
   */
  last?: string;
}

export interface Pagination<Item> {
  /**
   * The list of items to be returned
   */
  items: Array<Item>;
  /**
   * The associated meta information
   */
  meta: PaginationMeta;
  /**
   * associated links
   */
  links: PaginationLinks;
}

@Injectable()
export class PaginationInterceptor<Item>
  implements
    NestInterceptor<{ rows: Array<Item>; count: number }, Pagination<Item>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<{ rows: Array<Item>; count: number }>,
  ): Observable<Pagination<Item>> {
    const request = context.switchToHttp().getRequest<Request>();
    const { limit: itemsPerPage, page: currentPage } = plainToInstance(
      Paginate,
      request.query,
    );

    return next.handle().pipe(
      map(({ count: totalItems, rows: items }) => {
        const itemCount = items.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const meta: PaginationMeta = {
          itemCount,
          totalItems,
          itemsPerPage,
          totalPages,
          currentPage,
        };

        return {
          items,
          meta,
          links: this.#createLinks(request, meta),
        };
      }),
    );
  }

  #createLinks(request: Request, meta: PaginationMeta): PaginationLinks {
    const { limit: defaultLimit } = new Paginate();
    const url = new URL('http://localhost');
    url.protocol = request.protocol;
    url.host = request.get('host')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    url.pathname = request.path;

    if (meta.itemsPerPage !== defaultLimit) {
      url.searchParams.set('limit', String(meta.itemsPerPage));
    }

    return {
      first: url.toString(),
      previous:
        meta.currentPage > 1
          ? (url.searchParams.set('page', String(meta.currentPage - 1)),
            url.toString())
          : undefined,
      next:
        meta.currentPage < meta.totalPages
          ? (url.searchParams.set('page', String(meta.currentPage + 1)),
            url.toString())
          : undefined,
      last:
        meta.totalPages > 1
          ? (url.searchParams.set('page', String(meta.totalPages)),
            url.toString())
          : undefined,
    };
  }
}
