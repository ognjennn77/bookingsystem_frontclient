import { OnInit, Component, Input, OnChanges } from "@angular/core";
import { PaginationService } from "./pagination.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Params } from "@angular/router/src/shared";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  providers: [PaginationService]
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalNumber: number;
  pager: any = {};

  constructor(private pagerService: PaginationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        let page = queryParams['page'];
        if (!(page == undefined)) {
          this.setPage(+page);
        } else {
          this.setPage(1);
        }
      }
    );
  }

  ngOnChanges() {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        let page = queryParams['page'];
        if (!(page == undefined)) {
          this.setPage(+page);
        } else {
          this.setPage(1);
        }
      }
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(+this.totalNumber, page);
  }
}