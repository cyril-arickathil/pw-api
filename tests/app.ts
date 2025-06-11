type ContactName = string;
type ContactStatus = "active" | "inactive";
enum PaymentType {
  CASH = "c",
  CARD = "cc",
}

interface userDetails {
  name: string;
  preferredName: ContactName;
  status: ContactStatus;
  payment?: PaymentType;
}

const user1: userDetails = {
  name: "david",
  preferredName: "dave",
  status: "active",
  payment: PaymentType.CARD,
};

console.log(user1);