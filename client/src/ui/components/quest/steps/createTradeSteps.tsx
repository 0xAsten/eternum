import { StepOptions } from "shepherd.js";
import { STYLES, waitForElement } from "./utils";

export const createTradeSteps: StepOptions[] = [
  {
    title: "Trading in Eternum",
    text: "Trading is the lifeblood of Eternum. Learn how to create trades to grow your economy.",
    classes: STYLES.defaultStepPlacement,
    buttons: [
      {
        text: "Next",
        action: function () {
          return this.next();
        },
        classes: STYLES.defaultButton,
      },
    ],
  },
  {
    title: "Trade Menu",
    text: "Open the trade menu to access the marketplace",
    attachTo: {
      element: ".trade-selector",
      on: "right",
    },
    advanceOn: {
      selector: ".trade-selector",
      event: "click",
    },
    buttons: [
      {
        text: "Prev",
        action: function () {
          return this.back();
        },
        classes: STYLES.defaultButton,
      },
    ],
  },
  {
    title: "Market Overview",
    text: "This is the marketplace where you can trade resources with other players",
    attachTo: {
      element: ".market-modal-selector",
      on: "top",
    },
    beforeShowPromise: function () {
      return waitForElement(".market-modal-selector");
    },
    buttons: [
      {
        text: "Prev",
        action: function () {
          return this.back();
        },
        classes: STYLES.defaultButton,
      },
      {
        text: "Next",
        action: function () {
          return this.next();
        },
        classes: STYLES.defaultButton,
      },
    ],
  },
  {
    title: "Resource Overview",
    text: "Here you can see your available resources for trading",
    attachTo: {
      element: ".market-resource-bar-selector",
      on: "right",
    },
    buttons: [
      {
        text: "Prev",
        action: function () {
          return this.back();
        },
        classes: STYLES.defaultButton,
      },
      {
        text: "Next",
        action: function () {
          return this.next();
        },
        classes: STYLES.defaultButton,
      },
    ],
  },
  {
    title: "Trading Options",
    text: "You can buy resources, sell resources, or use the automated market maker (AMM)",
    attachTo: {
      element: ".market-resource-bar-header-selector",
      on: "right",
    },
    buttons: [
      {
        text: "Prev",
        action: function () {
          return this.back();
        },
        classes: STYLES.defaultButton,
      },
      {
        text: "Next",
        action: function () {
          return this.next();
        },
        classes: STYLES.defaultButton,
      },
    ],
  },
  {
    title: "Create Order",
    text: "Click here to create a new buy or sell order",
    attachTo: {
      element: ".order-create-buy-selector",
      on: "right",
    },
    scrollTo: true,
    buttons: [
      {
        text: "Prev",
        action: function () {
          return this.back();
        },
        classes: STYLES.defaultButton,
      },
      {
        text: "Next",
        action: function () {
          return this.next();
        },
        classes: STYLES.defaultButton,
      },
    ],
  },
  {
    title: "Order Book",
    text: "View all active buy and sell orders in the order book",
    attachTo: {
      element: ".order-book-selector",
      on: "right",
    },
    buttons: [
      {
        text: "Prev",
        action: function () {
          return this.back();
        },
        classes: STYLES.defaultButton,
      },
      {
        text: "Finish",
        action: function () {
          return this.complete();
        },
        classes: STYLES.defaultButton,
      },
    ],
  },
];
