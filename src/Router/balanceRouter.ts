import express, { json } from "express";
import validate from "../middleware/validate";
import { balanceType, balanceSchema } from "../zodSchema/balanceSchema";

export const balanceRoute = express();

let customerArr: balanceType[] = [
  {
    id: "1234",
    username: "nasser",
    password: "nam&hjwh12",
    balance: 1000,
  },
];

// get
balanceRoute.get(`/`, (req, res) => {
  return res.json(customerArr);
});

//post
balanceRoute.post(`/`, validate(balanceSchema), (req, res) => {
  const newCustomer = req.body;

  customerArr.push(newCustomer);
  return res.json({
    message: "customer added !",
  });
});

// update
balanceRoute.put(`/:id`, validate(balanceSchema), (req, res) => {
  const { id } = req.params;
  const newUpdate = req.body as balanceType;

  customerArr.map((customer) => {
    if (customer.id === id || customer.username === id) {
      customer.id = newUpdate.id;
      customer.username = newUpdate.username;
      customer.password = newUpdate.password;
      customer.balance = newUpdate.balance;

      return res.json({
        message: "customer updated !",
      });
    } else {
      return res.json({
        message: `customer with id: ${id} didn't valid`,
      });
    }
  });
});

// delete
balanceRoute.delete(`/:id`, (req, res) => {
  const { id } = req.params;
  customerArr.map((customer) => {
    if (customer.id === id) {
      const newArr = customerArr.filter((del) => {
        return del.id !== id;
      });
      customerArr = newArr;

      return res.json({
        message: "customer deleted !",
      });
    } else {
      return res.json({
        message: `customer with id: ${id} didn't valid`,
      });
    }
  });
});

// withdraw func
balanceRoute.put(`/wirtdraw/:id/:amount`, (req, res) => {
  const id: string = req.params.id;
  const amount = Number(req.params.amount);
  customerArr.map((customer) => {
    if (customer.id === id) {
      if (customer.balance >= amount) {
        customer.balance = customer.balance - amount;
        return res.json({
          message: `Hello ${customer.username} , you wirtdrawed ${amount} SAR from your acount . your balance now is ${customer.balance}`,
        });
      } else {
        return res.json({
          message: `sorry ${customer.username} you don't have ${amount} i your acount , your balance is ${customer.balance}`,
        });
      }
    }
  });
});

// deposits func
balanceRoute.put(`/deposits/:id/:amount`, (req: any, res) => {
  const id = req.params.id;
  const amount = req.params.amount;
  customerArr.map((customer) => {
    if (customer.id === id) {
      customer.balance = Number(customer.balance + amount);
      return res.json({
        message: `Hello ${customer.username} , you added ${amount} SAR to your acount . your balance now is ${customer.balance}`,
      });
    } else
      return res.json({
        message: "soory the customer isn't valid",
      });
  });
});
