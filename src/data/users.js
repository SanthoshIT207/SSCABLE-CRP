// AUTO DATE FUNCTION
const getMonthStartDate = (monthOffset = 0) => {

  return new Date(
    new Date().getFullYear(),
    new Date().getMonth() + monthOffset,
    1
  ).toISOString();
};

const getMonthEndDate = (monthOffset = 0) => {

  return new Date(
    new Date().getFullYear(),
    new Date().getMonth() + monthOffset + 1,
    0
  ).toISOString();
};

const users = [

  {
    serial: "3050352797",
    password: "",
    username: "A ANANDAKUMAR G",
    phone: "9443737239",
    address: "APPACHI LAYOUT CHANDRAPURAM EAST TIRUPPUR",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3105249174",
    password: "",
    username: "Aarumugam Aarumugam",
    phone: "9361024781",
    address: "Amaravathy Nagar 2nd Street",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3105376571",
    password: "",
    username: "Abdul Samath Khan",
    phone: "9786543210",
    address: "S/o Sulaiman Khan, DKT School",
    plan: "STAR PLUS, TCCL CLASSIC PACK",
    price: "₹210.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050285409",
    password: "",
    username: "Santhosh B",
    phone: "9894123456",
    address: "NO.1 2",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050298943",
    password: "",
    username: "Sanjay B",
    phone: "9842214785",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL CLASSIC PACK, UDAYA MOVIES",
    price: "₹210.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050312646",
    password: "",
    username: "Balasubramaniyam R",
    phone: "9566341278",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050317114",
    password: "",
    username: "Ramakrishnan P",
    phone: "9150678945",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050317442",
    password: "",
    username: "Shyam Sundar S",
    phone: "9345126780",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(-1),
    expiryDate: getMonthEndDate(-1),
  },

  {
    serial: "3050321511",
    password: "",
    username: "Vikram V",
    phone: "9791452368",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050324682",
    password: "",
    username: "Tharun M",
    phone: "9087654321",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL CLASSIC PACK",
    price: "₹210.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050324749",
    password: "",
    username: "Siddarthan M R",
    phone: "9944785632",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL PREMIUM PACK",
    price: "₹217.74",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050338699",
    password: "",
    username: "Abishek A",
    phone: "9623457812",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(-1),
    expiryDate: getMonthEndDate(-1),
  },

  {
    serial: "3050341799",
    password: "",
    username: "Vishnuram U",
    phone: "9367852140",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL CLASSIC PACK",
    price: "₹210.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050341844",
    password: "",
    username: "Dhanin Kumar R",
    phone: "9043215678",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(-1),
    expiryDate: getMonthEndDate(-1),
  },

  {
    serial: "3050380843",
    password: "",
    username: "Karthikeyan M",
    phone: "9843124785",
    address: "Amaravathy Nagar, Tiruppur",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "74318513483",
    password: "",
    username: "Akathiyan Akathiyan",
    phone: "9789654123",
    address: "Kalipalayam Papa Thottam",
    plan: "TCCL CLASSIC PACK",
    price: "₹210.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3105407677",
    password: "",
    username: "Ambikaa A",
    phone: "9090909090",
    address: "Amaravathy Nagar 7th Street",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3050454703",
    password: "",
    username: "Anthony",
    phone: "9787412365",
    address: "Kaalipalayam Manthakattu Thottam",
    plan: "TCCL CLASSIC PACK",
    price: "₹210.94",

    rechargeDate: getMonthStartDate(-1),
    expiryDate: getMonthEndDate(-1),
  },

  {
    serial: "3106411407",
    password: "",
    username: "Arunambal Nagararaj",
    phone: "9952147856",
    address: "Amaravathy Nagar 2nd Street",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

  {
    serial: "3106622222",
    password: "",
    username: "Aruchamy Aruchamy",
    phone: "9345012789",
    address: "Amaravathy Nagar 2nd Street",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(-1),
    expiryDate: getMonthEndDate(-1),
  },

  {
    serial: "3105336525",
    password: "",
    username: "Chinnadurai C",
    phone: "9087123456",
    address: "Amaravathy Nagar Peruntholuvu Post Tirupur",
    plan: "TCCL TAMIL SD",
    price: "₹131.94",

    rechargeDate: getMonthStartDate(0),
    expiryDate: getMonthEndDate(0),
  },

];

export default users;