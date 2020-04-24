const invoices = require("../json/invoices.json");
const statement = require("../src/htmlStatement").statement;

const ch01Result = `<H1>청구 내역 (고객명: BigCo)</H1>
<TABLE><TR><TH>연극</TH><TH>좌석 수</TH><TH>금액</TH></TR><TR><TD>Hamlet</TD><TD>$650.00</TD><TD>55석</TD></TR>
<TR><TD>As you Like it</TD><TD>$580.00</TD><TD>35석</TD></TR>
<TR><TD>Othello</TD><TD>$500.00</TD><TD>40석</TD></TR>
</TABLE><P>총액: <EM>$1,730.00
<P>적립 포인트: <EM>47</EM>점</P>
`;

test("This is a sample", () => {
  expect(statement(invoices[0])).toBe(ch01Result);
});
