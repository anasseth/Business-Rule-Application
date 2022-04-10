import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-business-rule',
  templateUrl: './business-rule.component.html',
  styleUrls: ['./business-rule.component.scss']
})
export class BusinessRuleComponent implements OnInit {

  dataProcessing: boolean = false
  sampleCondition: any = { "all": [{ "name": "expiration_days", "operator": "equal_to", "value": 90 }, { "all": [{ "name": "expiration_days", "operator": "equal_to", "value": 23 }, { "name": "expiration_days", "operator": "equal_to", "value": 90 }, { "name": "expiration_days", "operator": "equal_to", "value": 87 }] }, { "all": [{ "name": "current_month", "operator": "equal_to", "value": "2" }, { "name": "expiration_days", "operator": "equal_to", "value": 5 }, { "all": [{ "name": "expiration_days", "operator": "equal_to", "value": 76 }, { "all": [{ "name": "expiration_days", "operator": "equal_to", "value": 54 }] }] }] }, { "name": "expiration_days", "operator": "less_than", "value": 10 }, { "name": "expiration_days", "operator": "equal_to", "value": 90 }] }
  sampleAction: any = [{ "name": "put_on_sale", "params": { "sale_percentage": "23" } }, { "name": "order_more", "params": { "number_to_order": "112" } }, { "name": "put_on_sale", "params": { "sale_percentage": "45" } }, { "name": "put_on_sale", "params": { "sale_percentage": "90" } }]
  showAlert: boolean = false
  alertMessage!: string;
  isError: boolean = true

  constructor(public _Global: GlobalService) { }

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

  LoadData() {
    // API GET Request Here
    // After Request is Completed Set It To LocalStorage
    this._Global.showSpinner()
    this.dataProcessing = true;

    setTimeout(() => {
      // set Condition data Below
      localStorage.setItem("conditions", JSON.stringify(this.sampleCondition))
      // set Action data Below
      localStorage.setItem("actions", JSON.stringify(this.sampleAction))

      this.dataProcessing = false;
      location.reload()
      this._Global.hideSpinner()
      this.displayAlert("Data Successfully Retrieved")
      this.isError = false
    }, 2000);
  }

  postData() {
    var conditions = localStorage.getItem("conditions");
    var actions = localStorage.getItem("actions");
    if ((conditions != null && conditions != undefined) || (actions != null && actions != undefined)) {
      var object = {
        conditions: conditions,
        actions: actions
      }
      console.log(JSON.stringify(object, undefined, 3))
      this.displayAlert("Data Posted Succesfully")
      this.isError = false
    }
    else {
      this.displayAlert("Errors ! Couldn't Empty Post Object")
      this.isError = true
    }
  }

  displayAlert(message: string) {
    this.showAlert = true;
    this.alertMessage = message;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
