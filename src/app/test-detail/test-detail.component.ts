import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styles: ['']
})
export class TestDetailComponent implements OnInit, OnDestroy {
  fForm: FormGroup;
  private subscribeRef1: any;
  private subscribeRef2: any;
  private returnUrl: string = null;
  private httpEndpoint: string;
  id: number;
  fieldValues: { [index: string]: any, createdAt: string, updatedAt: string } = { createdAt: '', updatedAt: '' };
  fieldSelLists: { [index: string]: { id: string | number, name: string | number }[] } = {};
  userErrorMessage: string = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  init() {
    this.httpEndpoint = 'http://localhost:3000/api/area'
  }

  buildFieldSelLists(cb: () => void) {
    // Build Required Data Lists (like selection lists) for Fields
    this.fieldSelLists.status = [{ id: 'On', name: 'On' }, { id: 'Off', name: 'Off' }];

    forkJoin([
      this.http.get('http://localhost:3000/api/factory'),
    ]).subscribe(
      (results) => {
        // results is an array
        this.fieldSelLists.factory = <any>results[0];

        // Call cb when all is done
        cb();
      },
      (err) => {
        console.error(err);
      });
  }

  buildForm() {
    // Build Reactive Form fields
    this.fForm = this.fb.group({
      name: ['', [Validators.required]],
      comment: ['', []],
      status: ['', [Validators.required]],
      factoryId: ['', [Validators.required]],
    });
  }

  ///////////////////////////////////////////////////////////////////
  /**
   * Standard Code
   */
  ///////////////////////////////////////////////////////////////////

  ngOnInit() {
    // Init
    this.init();

    // Get & keep return url
    this.subscribeRef2 = this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });

    // Get requested record id
    this.subscribeRef1 = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.buildFieldSelLists(() => {
        // Is adding?
        if (this.id <= 0)
          return;

        // Read record
        this.http
          .get(this.httpEndpoint + '/' + this.id)
          .subscribe(
            (result: any) => {
              this.fieldValues = result;
              if (!result)
                return console.warn(`Returned result is not valid: ${result}`);

              // Find & set form fields
              Object.keys(result).forEach((key) => {
                if (this.fForm.controls[key]) {
                  this.fForm.controls[key].setValue(result[key]);
                }
              });
            },
            (error) => {
              this.userErrorMessage = this.formatErrorMessage(error);
            });
      });

      // Build Form
      this.buildForm();
    });
  }

  ngOnDestroy() {
    this.subscribeRef1.unsubscribe();
    this.subscribeRef2.unsubscribe();
  }

  onSubmit({ updateValues, valid }: { updateValues: any, valid: boolean }) {
    this.userErrorMessage = null;

    if (this.id <= 0) {
      // Add Record
      this.http
        .post(this.httpEndpoint, this.fForm.value)
        .subscribe(
          (result) => {
            if (this.returnUrl)
              this.router.navigateByUrl(this.returnUrl);
          },
          (error) => {
            this.userErrorMessage = this.formatErrorMessage(error);
          });
    }
    else {
      // Update Record
      this.http
        .put(this.httpEndpoint + '/' + this.id, this.fForm.value)
        .subscribe(
          (result) => {
            if (this.returnUrl)
              this.router.navigateByUrl(this.returnUrl);
          },
          (error) => {
            this.userErrorMessage = this.formatErrorMessage(error);
          });
    }
  }

  onCancel() {
    if (this.returnUrl)
      this.router.navigateByUrl(this.returnUrl);
  }

  formatErrorMessage(error: any) {
    // Http Client
    if (error && error.error && error.error.message)
      return `${error.statusText} / ${error.error.name || ''} : ${error.error.message}`

    // Server Error
    if (error && error.error && error.error.error && error.error.error.message)
      return `${error.statusText} / ${error.error.name || ''} : ${error.error.error.message}`

    console.error(error);
    return JSON.stringify(error);
  }
}
