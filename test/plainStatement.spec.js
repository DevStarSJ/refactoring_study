const invoices = require("../json/invoices.json");
const statement = require("../src/plainStatement").statement;

const ch01Result = `청구 내역 (고객명: BigCo)
  Hamlet: $650.00 (55석)
  As you Like it: $580.00 (35석)
  Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`;

test("This is a sample", () => {
  expect(statement(invoices[0])).toBe(ch01Result);
});
