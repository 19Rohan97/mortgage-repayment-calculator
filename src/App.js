import { useState, useEffect, useRef } from "react";
import IllustrationEmpty from "./assets/images/illustration-empty.svg";
import Calculator from "./assets/images/icon-calculator.svg";

export default function App() {
  const [active, setActive] = useState(null);
  const [error, setError] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [output, setOutput] = useState(0);

  const [mortgageAmount, setMortgageAmount] = useState(0);
  const [mortgageTerm, setMortgageTerm] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [mortgageType, setMortgageType] = useState("repayment");

  const amountRef = useRef();
  const termRef = useRef();
  const rateRef = useRef();

  useEffect(() => {
    amountRef.current?.querySelector("input")?.focus();

    function handleClickOutside(event) {
      if (
        amountRef.current?.contains(event.target) ||
        termRef.current?.contains(event.target) ||
        rateRef.current?.contains(event.target)
      ) {
        return;
      }
      setActive(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // Errors
    if (!mortgageAmount || !mortgageTerm || !interestRate) {
      setError("This field is required.");
      return;
    }

    if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate)) {
      setError("Please enter valid numbers.");
      return;
    }

    setError(null);

    // Calculation
    // Monthly Payment = mortgageAmount * interest * (1 + interest)^totalPayments / ((1 + interest)^totalPayments - 1)
    let interest = interestRate / 100 / 12;
    let totalPayments = mortgageTerm * 12;

    const P = Number(mortgageAmount);
    const r = interest; // monthly rate
    const n = totalPayments;

    console.log(r);

    if (mortgageType === "repayment" && r === 0) {
      setError("Interest rate must be greater than 0 for repayment mortgages.");
      return;
    }

    let monthlyPayment;

    if (mortgageType === "repayment") {
      monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      // Interest-only: just interest per month
      monthlyPayment = P * r;
    }

    setOutput(monthlyPayment.toFixed(2));
    setHasCalculated(true);
  }

  function handleClear() {
    setMortgageAmount(0);
    setMortgageTerm(0);
    setInterestRate(0);
    setMortgageType("repayment");
    setOutput(0);
    setError(null);
    setActive(null);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(value);
  }

  return (
    <main className="bg-slate-100 md:p-10 w-full min-h-screen flex justify-center items-center">
      <section className="w-full max-w-[1009px] mx-auto bg-white md:rounded-3xl overflow-hidden flex flex-col lg:flex-row justify-between items-stretch">
        <div className="px-6 py-8 md:p-10 w-full lg:max-w-[504px] flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="preset-2 text-slate-900 ">Mortgage Calculator</h3>
            <button
              className="preset-4 text-slate-700 capitalize underline"
              onClick={() => handleClear()}
            >
              Clear all
            </button>
          </div>

          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group flex flex-col gap-3">
              <label
                htmlFor="mortgage-amount"
                className="text-slate-700 preset-4"
              >
                Mortgage Amount
              </label>
              <div
                ref={amountRef}
                onClick={() => setActive("amount")}
                className={`relative overflow-hidden border  rounded w-full ${
                  active === "amount"
                    ? "border-lime-900"
                    : "border-slate-500 hover:border-slate-900"
                }`}
              >
                <input
                  type="number"
                  min="0"
                  step="any"
                  id="mortgage-amount"
                  className="w-full h-12 pe-4 py-3 ps-14 outline-none preset-3 text-slate-900"
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(e.target.value)}
                />
                <span
                  className={`currency preset-3 text-slate-700  absolute top-0 left-0 w-fit h-full px-4 py-3 ${
                    active === "amount" ? "bg-lime-900" : "bg-slate-100"
                  }`}
                >
                  £
                </span>
              </div>
            </div>

            <div className="form-row w-full my-6 flex flex-col md:flex-row gap-6">
              <div className="form-group w-full flex flex-col gap-3">
                <label
                  htmlFor="mortgage-term"
                  className="text-slate-700 preset-4"
                >
                  Mortgage Term
                </label>
                <div
                  ref={termRef}
                  onClick={() => setActive("term")}
                  className={`relative overflow-hidden border  rounded w-full ${
                    active === "term"
                      ? "border-lime-900"
                      : "border-slate-500 hover:border-slate-900"
                  }`}
                >
                  <input
                    type="number"
                    min="0"
                    step="any"
                    id="mortgage-term"
                    className="w-full h-12 px-4 py-3 outline-none preset-3 text-slate-900"
                    value={mortgageTerm}
                    onChange={(e) => setMortgageTerm(e.target.value)}
                  />
                  <span
                    className={`preset-3 text-slate-700  absolute top-0 right-0 w-fit h-full px-4 py-3 ${
                      active === "term" ? "bg-lime-900" : "bg-slate-100"
                    }`}
                  >
                    years
                  </span>
                </div>
              </div>
              <div className="form-group w-full flex flex-col gap-3">
                <label
                  htmlFor="interest-rate"
                  className="text-slate-700 preset-4"
                >
                  Interest Rate
                </label>
                <div
                  ref={rateRef}
                  onClick={() => setActive("rate")}
                  className={`relative overflow-hidden border  rounded w-full ${
                    active === "rate"
                      ? "border-lime-900"
                      : "border-slate-500 hover:border-slate-900"
                  }`}
                >
                  <input
                    type="number"
                    min="0"
                    step="any"
                    id="interest-rate"
                    className="w-full h-12 px-4 py-3 outline-none preset-3 text-slate-900"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                  <span
                    className={`preset-3 text-slate-700  absolute top-0 right-0 w-fit h-full px-4 py-3 ${
                      active === "rate" ? "bg-lime-900" : "bg-slate-100"
                    }`}
                  >
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group flex flex-col gap-4">
              <h6 className="preset-4 block">Mortgage Type</h6>

              <Radio
                id="repayment"
                name="mortgage-type"
                mortgageType={mortgageType}
                setMortgageType={setMortgageType}
              >
                Repayment
              </Radio>

              <Radio
                id="interest"
                name="mortgage-type"
                mortgageType={mortgageType}
                setMortgageType={setMortgageType}
              >
                Interest Only
              </Radio>
            </div>

            <button
              type="submit"
              className=" py-4 px-10 mt-10 bg-lime-900 hover:bg-opacity-50 transition-colors duration-500 preset-3  text-slate-900 rounded-full flex justify-center items-center gap-3"
            >
              <img src={Calculator} alt="Calculate" />
              <span>Calculate Repayments</span>
            </button>
          </form>
        </div>
        <div className="w-full lg:max-w-[504px] bg-slate-900 rounded-6 lg:rounded-bl-[80px] px-6 py-8 md:p-10 flex flex-col justify-center items-center gap-4">
          {!hasCalculated ? (
            <>
              <img src={IllustrationEmpty} alt="Results" />
              <h2 className="preset-2  text-white text-center">
                Results shown here
              </h2>
              <p className="text-slate-300 preset-4 text-center">
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
              </p>
            </>
          ) : (
            <>
              <h3 className="preset-2 text-white w-full ">Your results</h3>
              <p className="mt-4 mb-10 text-slate-300 preset-4">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                “calculate repayments” again.
              </p>

              <div className="result-container bg-black bg-opacity-25 border-t-4 border-lime-900 p-8 w-full rounded-lg">
                <p className="text-slate-300 mb-2">Your monthly repayments</p>
                <h2 className="preset-1 text-lime-900">
                  {formatCurrency(output)}
                </h2>

                <hr className="my-8 border-slate-300 border-opacity-25" />

                <p className="text-slate-300 mb-2">
                  Total you'll repay over the term
                </p>
                <p className="preset-2 text-white">
                  {formatCurrency((output * 12 * mortgageTerm).toFixed(2))}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function Radio({ id, name, mortgageType, setMortgageType, children }) {
  return (
    <div className="flex items-center w-full">
      <input
        type="radio"
        id={id}
        name={name}
        className="hidden"
        checked={mortgageType === id}
        onChange={() => setMortgageType(id)}
      />
      <label
        htmlFor={id}
        className="flex items-center gap-4 preset-3  text-slate-900 border border-slate-500 hover:border-lime-900 rounded px-4 py-3 cursor-pointer w-full"
      >
        <span className="w-4 h-4 inline-block rounded-full border border-slate-500"></span>
        {children}
      </label>
    </div>
  );
}
