"use strict";

function amountFor(aPerformance) {
  let result = 0;

  switch (aPerformance.play.type) {
    case "tragedy": // 비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;

    case "comedy": // 희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;

    default:
      throw new Error(`알 수 없는 장르:  ${aPerformance.play.type}`);
  }
  return result;
}

function totalAmount(invoice) {
  let result = 0;
  for (let perf of invoice.performances) {
    result += amountFor(perf);
  }
  return result;
}

function volumeCreditsFor(aPerformance) {
  let result = Math.max(aPerformance.audience - 30, 0);

  // 희극 관객 5명마다 추가 포인트를 제공한다.
  if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
  return result;
}

function totalVolumeCredits(invoice) {
  let result = 0;
  for (let perf of invoice.performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function enrichPerformance(aPerformance) {
  const result = Object.assign({}, aPerformance);
  result.play = playFor(aPerformance);

  return result;

  function playFor(aPerformance) {
    const plays = require("../json/plays.json");
    return plays[aPerformance.playID];
  }
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount(data))}\n`;
  result += `적립 포인트: ${totalVolumeCredits(data)}점\n`;
  return result;
}

function statement(invoice) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  return renderPlainText(statementData);
}

exports.statement = statement;
