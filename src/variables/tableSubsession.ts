type RowObj = {
  id: number;
  name: string;
  status: string;
  session: string;
  date: string;
};

const tableSubsession: RowObj[] = [
  {
    name: "Ojo Store Jun 22",
    status: "Ongoing",
    date: "22/06/2023",
    id: 2642,
    session: "March W1 Sessions",
  },
  {
    name: "Ikeja Subsession",
    status: "Ongoing",
    date: "22/06/2023",
    id: 2992,
    session: "March W1 Sessions",
  },
  {
    name: "Ikeja Store Second Subsession",
    status: "Upcoming",
    date: "22/06/2023",
    id: 2387,
    session: "March W1 Sessions",
  },
  {
    name: "Iba Subsession for Late June",
    status: "Upcoming",
    date: "22/06/2023",
    id: 4142,
    session: "March W2 Sessions",
  },
];

export default tableSubsession;