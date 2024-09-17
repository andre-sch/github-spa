import { Fragment } from "react/jsx-runtime";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";

import "./styles/pagination.css";

interface PaginationProps {
  currentPage: number;
  numberOfPages: number;
  setPage: (page: number) => void;
}

function Pagination({ currentPage, numberOfPages, setPage }: PaginationProps) {
  const firstPage = 0;
  const lastPage = numberOfPages - 1;

  const limitOfRenderedPages = 7;
  const pages = listPagesToRender();

  return (
    <ul className="pagination">
      <li className="backward step-control">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage == firstPage}>
          <ChevronLeftIcon />
          <span>Previous</span>
        </button>
      </li>

      {pages.map(page => (
        <Fragment key={page}>
          {page == lastPage && shouldOmitPagesCloseTo(lastPage) && <li className="page ellipsis">...</li>}

          <li className="page">
            <button
              onClick={() => setPage(page)}
              aria-current={page == currentPage}
              children={page + 1} />
          </li>

          {page == firstPage && shouldOmitPagesCloseTo(firstPage) && <li className="page ellipsis">...</li>}
        </Fragment>
      ))}

      <li className="forward step-control">
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage == lastPage}>
          <span>Next</span>
          <ChevronRightIcon />
        </button>
      </li>
    </ul>
  );

  function shouldOmitPagesCloseTo(boundary: number): boolean {
    return numberOfPages > limitOfRenderedPages && distance(currentPage, boundary) > 3;
  }

  function distance(a: number, b: number): number {
    return Math.abs(a - b);
  }

  function listPagesToRender(): number[] {
    const selection = new PriorityQueue();
    selection.add(currentPage);
  
    const selectionLimit = Math.min(numberOfPages, limitOfRenderedPages);
  
    if (currentPage != firstPage) selection.add(firstPage);
    if (currentPage != lastPage) selection.add(lastPage);
  
    var shift = 1;
    while (selection.length() < selectionLimit) {
      if (currentPage - shift > firstPage)
        selection.add(currentPage - shift);
  
      if (selection.length() == selectionLimit) break;
  
      if (currentPage + shift < lastPage)
        selection.add(currentPage + shift);
  
      shift++;
    }
    
    return selection.items();
  }
}

class PriorityQueue {
  private data: number[] = [];

  public items() { return this.data; }
  public length() { return this.data.length; }

  public add(item: number): void {
    var i = this.data.length;
    while (i > 0 && this.data[i-1] > item) {
      this.data[i] = this.data[i-1];
      i--;
    }
    this.data[i] = item;
  }

  public remove(): number {
    const element = this.data.shift();
    if (element) return element;
    else throw new Error("queue is empty");
  }
}

export { Pagination };
