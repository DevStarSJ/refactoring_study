"use strict";

const createStatementData = require("./createStatementData").createStatementData;

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function renderHtml(data) {
  let result = `<H1>청구 내역 (고객명: ${data.customer})</H1>\n`;
  result += "<TABLE>";
  result += "<TR><TH>연극</TH><TH>좌석 수</TH><TH>금액</TH></TR>";

  for (let perf of data.performances) {
    result += `<TR><TD>${perf.play.name}</TD><TD>${usd(perf.amount)}</TD>`;
    result += `<TD>${perf.audience}석</TD></TR>\n`;
  }
  result += "</TABLE>";
  result += `<P>총액: <EM>${usd(data.totalAmount)}\n`;
  result += `<P>적립 포인트: <EM>${data.totalVolumeCredits}</EM>점</P>\n`;
  return result;
}

function htmlStatement(invoice) {
  return renderHtml(createStatementData(invoice));
}

exports.statement = htmlStatement;
