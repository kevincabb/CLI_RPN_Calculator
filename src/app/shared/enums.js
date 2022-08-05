exports.Operator = {
  Addition: "+",
  Subtraction: "-",
  Multiplication: "*",
  Division: "/",
};

exports.CalcConstant = {
  MinOperandStackLength: 2,
  MinOperatorQueueLength: 1,
};

exports.CalcAppAction = {
  End: "q",
  Clear: "c",
};
