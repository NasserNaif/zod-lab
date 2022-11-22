"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceRoute = void 0;
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const balanceSchema_1 = require("../zodSchema/balanceSchema");
exports.balanceRoute = (0, express_1.default)();
let customerArr = [
    {
        id: "1234",
        username: "nasser",
        password: "nam&hjwh12",
        balance: 1000,
    },
];
exports.balanceRoute.get(`/`, (req, res) => {
    return res.json(customerArr);
});
exports.balanceRoute.post(`/`, (0, validate_1.default)(balanceSchema_1.balanceSchema), (req, res) => {
    const newCustomer = req.body;
    customerArr.push(newCustomer);
    return res.json({
        message: "customer added !",
    });
});
exports.balanceRoute.put(`/:id`, (0, validate_1.default)(balanceSchema_1.balanceSchema), (req, res) => {
    const { id } = req.params;
    const newUpdate = req.body;
    customerArr.map((customer) => {
        if (customer.id === id || customer.username === id) {
            customer.id = newUpdate.id;
            customer.username = newUpdate.username;
            customer.password = newUpdate.password;
            customer.balance = newUpdate.balance;
            return res.json({
                message: "customer updated !",
            });
        }
        else {
            return res.json({
                message: `customer with id: ${id} didn't valid`,
            });
        }
    });
});
exports.balanceRoute.delete(`/:id`, (req, res) => {
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
        }
        else {
            return res.json({
                message: `customer with id: ${id} didn't valid`,
            });
        }
    });
});
exports.balanceRoute.put(`/wirtdraw/:id/:amount`, (req, res) => {
    const id = req.params.id;
    const amount = Number(req.params.amount);
    customerArr.map((customer) => {
        if (customer.id === id) {
            if (customer.balance >= amount) {
                customer.balance = customer.balance - amount;
                return res.json({
                    message: `Hello ${customer.username} , you wirtdrawed ${amount} SAR from your acount . your balance now is ${customer.balance}`,
                });
            }
            else {
                return res.json({
                    message: `sorry ${customer.username} you don't have ${amount} i your acount , your balance is ${customer.balance}`,
                });
            }
        }
    });
});
exports.balanceRoute.put(`/deposits/:id/:amount`, (req, res) => {
    const id = req.params.id;
    const amount = req.params.amount;
    customerArr.map((customer) => {
        if (customer.id === id) {
            customer.balance = Number(customer.balance + amount);
            return res.json({
                message: `Hello ${customer.username} , you added ${amount} SAR to your acount . your balance now is ${customer.balance}`,
            });
        }
        else
            return res.json({
                message: "soory the customer isn't valid",
            });
    });
});
