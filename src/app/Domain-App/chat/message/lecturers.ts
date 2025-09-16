import {Component} from '@angular/core';

@Component({
  selector: 'app-lecturers',
  imports: [],
  template: `
    <header id="header"
            class="navbar navbar-expand-lg navbar-fixed navbar-height navbar-container navbar-bordered bg-white">
      <div class="navbar-nav-wrap">
        <!-- Logo -->
        <a class="navbar-brand" href="./index.html" aria-label="Front">
          <img class="navbar-brand-logo-mini" src="./assets/svg/logos/logo-short.svg" alt="Logo"
               data-hs-theme-appearance="default">
        </a>
        <!-- End Logo -->

        <div class="navbar-nav-wrap-content-start">
          <!-- Navbar Vertical Toggle -->
          <button type="button" class="js-navbar-vertical-aside-toggle-invoker navbar-aside-toggler"
                  style="opacity: 1;">
            <i class="bi-arrow-bar-left navbar-toggler-short-align"
               data-bs-template="&lt;div class=&quot;tooltip d-none d-md-block&quot; role=&quot;tooltip&quot;&gt;&lt;div class=&quot;arrow&quot;&gt;&lt;/div&gt;&lt;div class=&quot;tooltip-inner&quot;&gt;&lt;/div&gt;&lt;/div&gt;"
               data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Collapse"
               data-bs-original-title="Collapse"></i>
            <i class="bi-arrow-bar-right navbar-toggler-full-align"
               data-bs-template="&lt;div class=&quot;tooltip d-none d-md-block&quot; role=&quot;tooltip&quot;&gt;&lt;div class=&quot;arrow&quot;&gt;&lt;/div&gt;&lt;div class=&quot;tooltip-inner&quot;&gt;&lt;/div&gt;&lt;/div&gt;"
               data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Expand"
               data-bs-original-title="Expand"></i>
          </button>

          <!-- End Navbar Vertical Toggle -->

          <!-- Search Form -->
          <div class="dropdown ms-2">
            <!-- Input Group -->
            <div class="d-none d-lg-block">
              <div
                class="input-group input-group-merge input-group-borderless input-group-hover-light navbar-input-group">
                <div class="input-group-prepend input-group-text">
                  <i class="bi-search"></i>
                </div>

                <input type="search" class="js-form-search form-control" placeholder="Find lecturer">
                <a class="input-group-append input-group-text" href="javascript:;">
                  <i id="clearSearchResultsIcon" class="bi-x-lg" style="display: none;"></i>
                </a>
              </div>
            </div>

            <button
              class="js-form-search js-form-search-mobile-toggle btn btn-ghost-secondary btn-icon rounded-circle d-lg-none"
              type="button" data-hs-form-search-options="{
                       &quot;clearIcon&quot;: &quot;#clearSearchResultsIcon&quot;,
                       &quot;dropMenuElement&quot;: &quot;#searchDropdownMenu&quot;,
                       &quot;dropMenuOffset&quot;: 20,
                       &quot;toggleIconOnFocus&quot;: true,
                       &quot;activeClass&quot;: &quot;focus&quot;
                     }">
              <i class="bi-search"></i>
            </button>
            <!-- End Input Group -->

          </div>

          <!-- End Search Form -->
        </div>

        <div class="navbar-nav-wrap-content-end">

        </div>
      </div>
    </header>
    <div class="card">
      <!-- Header -->
      <div class="card-header card-header-content-md-between">
        <div class="mb-2 mb-md-0">
          <form>
            <!-- Search -->
            <div class="input-group input-group-merge input-group-flush">
              <div class="input-group-prepend input-group-text">
                <i class="bi-search"></i>
              </div>
              <input id="datatableSearch" type="search" class="form-control" placeholder="Search users"
                     aria-label="Search users">
            </div>
            <!-- End Search -->
          </form>
        </div>

      </div>
      <!-- End Header -->

      <!-- Table -->
      <div class="table-responsive datatable-custom position-relative">
        <div id="datatable_wrapper" class="dataTables_wrapper no-footer">


          <table id="datatable" class="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle card-table dataTable no-footer">
            <thead class="thead-light">
            <tr role="row">
              <th class="table-column-pe-0 sorting_disabled" rowspan="1" colspan="1" aria-label="




                " style="width: 24px;">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="datatableCheckAll">
                  <label class="form-check-label" for="datatableCheckAll"></label>
                </div>
              </th>
              <th class="table-column-ps-0 sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1"
                  aria-label="Name: activate to sort column ascending" style="width: 181.958px;">Name
              </th>
              <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1"
                  aria-label="Position: activate to sort column ascending" style="width: 121.396px;">Position
              </th>
              <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1"
                  aria-label="Country: activate to sort column ascending" style="width: 99.615px;">Country
              </th>
              <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1"
                  aria-label="Status: activate to sort column ascending" style="width: 85.844px;">Status
              </th>
              <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1"
                  aria-label="Portfolio: activate to sort column ascending" style="width: 123.812px;">Portfolio
              </th>
              <th class="sorting" tabindex="0" aria-controls="datatable" rowspan="1" colspan="1"
                  aria-label="Role: activate to sort column ascending" style="width: 62.26px;">Role
              </th>
              <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="" style="width: 76.354px;"></th>
            </tr>
            </thead>

            <tbody>


            <tr role="row" class="odd">
              <td class="table-column-pe-0">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="datatableCheckAll1">
                  <label class="form-check-label" for="datatableCheckAll1"></label>
                </div>
              </td>
              <td class="table-column-ps-0">
                <a class="d-flex align-items-center" href="./user-profile.html">
                  <div class="avatar avatar-circle">
                    <img class="avatar-img" src="./assets/img/160x160/img10.jpg" alt="Image Description">
                  </div>
                  <div class="ms-3">
                    <span class="d-block h5 text-inherit mb-0">Amanda Harvey <i class="bi-patch-check-fill text-primary"
                                                                                data-bs-toggle="tooltip"
                                                                                data-bs-placement="top"
                                                                                aria-label="Top endorsed"
                                                                                data-bs-original-title="Top endorsed"></i></span>
                    <span class="d-block fs-5 text-body">amanda@site.com</span>
                  </div>
                </a>
              </td>
              <td>
                <span class="d-block h5 mb-0">Director</span>
                <span class="d-block fs-5">Human resources</span>
              </td>
              <td>United Kingdom</td>
              <td>
                <span class="legend-indicator bg-success"></span>Active
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <span class="fs-5 me-2">72%</span>
                  <div class="progress table-progress">
                    <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0"
                         aria-valuemax="100"></div>
                  </div>
                </div>
              </td>
              <td>Employee</td>
              <td>
                <button type="button" class="btn btn-white btn-sm" data-bs-toggle="modal"
                        data-bs-target="#editUserModal">
                  <i class="bi-pencil-fill me-1"></i> Edit
                </button>
              </td>
            </tr>


            </tbody>
          </table>
          <div class="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing 1 to 15 of 24
            entries
          </div>
        </div>
      </div>
      <!-- End Table -->

      <!-- Footer -->
      <div class="card-footer">
        <div class="row justify-content-center justify-content-sm-between align-items-sm-center">
          <div class="col-sm mb-2 mb-sm-0">
            <div class="d-flex justify-content-center justify-content-sm-start align-items-center">

            </div>
          </div>
          <!-- End Col -->

          <div class="col-sm-auto">
            <div class="d-flex justify-content-center justify-content-sm-end">
              <!-- Pagination -->
              <nav id="datatablePagination" aria-label="Activity pagination">
                <div class="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
                  <ul id="datatable_pagination" class="pagination datatable-custom-pagination">
                    <li class="paginate_item page-item disabled"><a class="paginate_button previous page-link"
                                                                    aria-controls="datatable" data-dt-idx="0"
                                                                    tabindex="0" id="datatable_previous"><span
                      aria-hidden="true">Prev</span></a></li>
                    <li class="paginate_item page-item active"><a class="paginate_button page-link"
                                                                  aria-controls="datatable" data-dt-idx="1"
                                                                  tabindex="0">1</a></li>
                    <li class="paginate_item page-item"><a class="paginate_button page-link" aria-controls="datatable"
                                                           data-dt-idx="2" tabindex="0">2</a></li>
                    <li class="paginate_item page-item"><a class="paginate_button next page-link"
                                                           aria-controls="datatable" data-dt-idx="3" tabindex="0"
                                                           id="datatable_next"><span aria-hidden="true">Next</span></a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <!-- End Col -->
        </div>
        <!-- End Row -->
      </div>
      <!-- End Footer -->
    </div>
  `
})
export class Lecturers {

}
