import { Component, OnInit } from '@angular/core';
import { LoginDetails } from 'src/app/models/loginDetails-model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { FundTranfer } from 'src/app/models/FundTranfer-model';
import { Users } from 'src/app/models/users-model';
import { Beneficiaries } from 'src/app/models/Beneficiaries-model';
import { BankService } from 'src/app/services/bank.service';

/**
  * @description This class has methods that deals with transferring funds
  */
@Component({
  selector: 'app-funds-transfer',
  templateUrl: './funds-transfer.component.html',
  styleUrls: ['./funds-transfer.component.css']
})
export class FundsTransferComponent implements OnInit {

  baseUrl: string;
  srcId: number;
  destId: number
  beneficiaryList: Array<any>;
  minimumBalance: number = 1000;

  model: FundTranfer;
  submitted: boolean;
  user: Users;
  beneficiaries: Array<any> = [
    {


    }
  ];

  /**
  * @description Constructor initializing the properties
  *  @param route
  *  @param dataService
  *  @param bankService
  */
  constructor(private route: Router, private dataService: DataService, private bankService: BankService) {
    this.submitted = false;
    this.baseUrl = `${environment.baseUrl}`;
    this.model = {
      srcAccountNumber: 0,
      amount: undefined,
      destAccountNumber: 0

    }
  }
  /**
  * @description This method fetches source account number and destination account numbers and populate in the screen
  */
  ngOnInit(): void {
    this.user = {
      beneficiaries: [],
      firstName: '',
      address: '',
      email: '',
      id: 0,
      mobileNumber: '',
      password: '',
      accountNumber: 0,
      accountType: '',
      openingBalance: 0,
      currentBalance: 0

    };
    this.dataService.getDataByUser(`${environment.baseUrl}/bankCustomers`, sessionStorage.getItem("email"))
      .subscribe((response: Users) => {

        this.user = response;
        this.model.srcAccountNumber = this.user[0].accountNumber;
        this.beneficiaryList = this.user[0].beneficiaries;
        for (let i = 0; i < this.beneficiaryList.length; i++) {
          this.bankService.getDataByUser(`${environment.baseUrl}/bankCustomers`, this.beneficiaryList[i])
            .subscribe((response: Users) => {
              let firstName = response[0].firstName;
              let accountNumber = response[0].accountNumber;
              let resp = response;
              this.beneficiaries.push(response[0]);

            },
              (error) => {

              },
              () => {

              });

        }
      },
        (error) => {
        },
        () => {
        });
  };

  /**
 * @description This method performs fund transfer
 * @param transfer
 * @param destAccount
 */
  submit = (transfer, destAccount) => {
    this.submitted = true;
    if (transfer.controls.amount.value < 1) {
      alert("Minimum Rs.1 is required to transfer");
      return;
    }
    if (transfer.valid) {
      const srcAccountNumber = transfer.controls.srcAccountNumber.value;
      const destinationAccount = destAccount.value;
      const amount = transfer.controls.amount.value;
      this.transferFund(this.user[0], destinationAccount, amount);
    }
  }

  /**
   * @description When transfer fund button clicked, this method validates user login
   */
  transferFund = (srcAccount, destAccount, amount) => {

    if (srcAccount.currentBalance - amount < this.minimumBalance) {
      alert(`Dear Customer, You need to maintain a minimum balance:Rs.${this.minimumBalance}`);
      return;
    }
    if (srcAccount.currentBalance < amount) {
      alert(`You don't have sufficient balance to make a transfer. You have only Rs.${srcAccount.currentBalance} in your account.`);
      return;
    }
    else {
      let srcUpdatedBalance = srcAccount.currentBalance - amount;
      srcAccount.currentBalance = srcUpdatedBalance;
      this.srcId = srcAccount.id;

      let destUpdatedBalance = destAccount.currentBalance + amount;
      destAccount.currentBalance = destUpdatedBalance;
      this.destId = destAccount.id;
    }

    this.dataService.updateData(`${environment.baseUrl}/bankCustomers/${this.srcId}`, srcAccount)
      .subscribe((response: Users) => {
        if (response !== null) {
          this.dataService.updateData(`${environment.baseUrl}/bankCustomers/${this.destId}`, destAccount)
            .subscribe((response: Users) => {
              if (response != null) {
                const postObj = { srcAccountNumber: srcAccount.accountNumber, destAccountNumber: destAccount.accountNumber, transferAmount: amount, tranferDate: new Date() };
                this.dataService.addData(`${environment.baseUrl}/transactions`, postObj)
                  .subscribe((response: Users) => {
                    if (response != null) {
                      alert("Fund transferred successfully");
                    }
                  },
                    (error) => {

                    },
                    () => {

                    })
              }
            },
              (error) => {

              },
              () => {

              })
        }

      },
        (error) => {

        },
        () => {

        })



  }
  /**
  * @description This method navigates customer to the home page
  */
  back = () => {
    this.route.navigate(['/home']);;
  }


}