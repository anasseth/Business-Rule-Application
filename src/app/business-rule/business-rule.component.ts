import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-business-rule',
  templateUrl: './business-rule.component.html',
  styleUrls: ['./business-rule.component.scss']
})
export class BusinessRuleComponent implements OnInit {

  dataProcessing: boolean = false
  data = {
    variables: [
      {
        name: "Test Variable 1",
        label: "Test Variable 1",
        field_type: "numeric",
        options: [],
      },
      {
        name: "Test Variable 2",
        label: "Test Variable 2",
        field_type: "string",
        options: [],
      },
      {
        name: "Test Variable 3",
        label: "Test Variable 3",
        field_type: "select",
        options: ["Eggnog", "Cookies", "Beef Jerkey"],
      },
    ],
    actions: [
      {
        name: "Test Action 1",
        label: "Test Action 1",
        params: [
          {
            name: "sale_percentage",
            label: "Sale Percentage",
            fieldType: "numeric",
          },
        ],
      },
      {
        name: "Test Action 2",
        label: "Test Action 2",
        params: [
          {
            name: "number_to_order",
            label: "Number To Order",
            fieldType: "numeric",
          },
        ],
      },
    ],
    variable_type_operators: {
      numeric: [
        { name: "equal_to", label: "Equal To", input_type: "numeric" },
        { name: "less_than", label: "Less Than", input_type: "numeric" },
        {
          name: "greater_than",
          label: "Greater Than",
          input_type: "numeric",
        },
      ],
      string: [
        { name: "equal_to", label: "Equal To", input_type: "text" },
        { name: "non_empty", label: "Non Empty", input_type: "none" },
      ],
      select: [
        { name: "contains", label: "Contains", input_type: "select" },
        {
          name: "does_not_contain",
          label: "Does Not Contain",
          input_type: "select",
        },
      ],
    },
  };

  sampleCondition: any = { "all": [{ "name": "expiration_days", "operator": "equal_to", "value": 90 }, { "all": [{ "name": "expiration_days", "operator": "equal_to", "value": 23 }, { "name": "expiration_days", "operator": "equal_to", "value": 90 }, { "name": "expiration_days", "operator": "equal_to", "value": 87 }] }, { "all": [{ "name": "current_month", "operator": "equal_to", "value": "2" }, { "name": "expiration_days", "operator": "equal_to", "value": 5 }, { "all": [{ "name": "expiration_days", "operator": "equal_to", "value": 76 }, { "all": [{ "name": "expiration_days", "operator": "equal_to", "value": 54 }] }] }] }, { "name": "expiration_days", "operator": "less_than", "value": 10 }, { "name": "expiration_days", "operator": "equal_to", "value": 90 }] }
  sampleAction: any = [{ "name": "put_on_sale", "params": { "sale_percentage": "23" } }, { "name": "order_more", "params": { "number_to_order": "112" } }, { "name": "put_on_sale", "params": { "sale_percentage": "45" } }, { "name": "put_on_sale", "params": { "sale_percentage": "90" } }]
  showAlert: boolean = false
  alertMessage!: string;
  isError: boolean = true
  downloadJsonHref: any = "";
  filename = "business-rule"
  IsFileReady: boolean = false;

  constructor(public _Global: GlobalService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  clearData() {
    this.dataProcessing = true
    this._Global.showSpinner()
    setTimeout(() => {
      localStorage.clear()
      this.dataProcessing = false
      location.reload()
      this._Global.hideSpinner()
    }, 500);

    this.displayAlert("Data Cleared Successfully")
    this.isError = false
  }

  generateDownloadJsonUri() {
    var conditions: any = localStorage.getItem("conditions");
    conditions = JSON.parse(conditions)
    var actions: any = localStorage.getItem("actions");
    actions = JSON.parse(actions)
    if ((conditions != null && conditions != undefined) || (actions != null && actions != undefined)) {
      var object = {
        conditions: conditions,
        actions: actions
      }
      let theJSON = JSON.stringify(object);
      let blob = new Blob([theJSON], { type: 'text/json' });
      let url = window.URL.createObjectURL(blob);
      let uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      this.downloadJsonHref = uri;
      console.log("downoadURL : ", this.downloadJsonHref)
    }
  }

  LoadData() {
    // API GET Request Here
    // After Request is Completed Set It To LocalStorage
    this._Global.showSpinner()
    this.dataProcessing = true;

    setTimeout(() => {
      // set Condition Data Below
      localStorage.setItem("conditions", JSON.stringify(this.sampleCondition))
      // set Action Data Below
      localStorage.setItem("actions", JSON.stringify(this.sampleAction))
      // set Variable Data Below
      localStorage.setItem("variables", JSON.stringify(this.data))

      this.dataProcessing = false;
      location.reload()
      this._Global.hideSpinner()
      this.displayAlert("Data Successfully Retrieved")
      this.isError = false
    }, 2000);
  }

  postData() {
    this.isError = false;
    this.IsFileReady = false;
    var conditions: any = localStorage.getItem("conditions");
    conditions = JSON.parse(conditions)
    var actions: any = localStorage.getItem("actions");
    actions = JSON.parse(actions)
    if ((conditions != null && conditions != undefined) || (actions != null && actions != undefined)) {
      var object = {
        conditions: conditions,
        actions: actions
      }
      console.log(JSON.stringify(object, undefined, 3))
      this.displayAlert("Data Posted Succesfully")
      this.isError = false
      this.IsFileReady = true
    }
    else {
      this.displayAlert("Errors ! Couldn't Empty Post Object")
      this.isError = true;
      this.IsFileReady = false;
    }
    this.generateDownloadJsonUri()
  }

  displayAlert(message: string) {
    this.showAlert = true;
    this.alertMessage = message;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
