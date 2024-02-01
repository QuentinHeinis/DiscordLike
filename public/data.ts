const Friends = [
  {
    name: "John Doe",
    img: "/1.jpg",
    id: 1,
    link: "/messages/1",
  },
  {
    name: "Paolo",
    img: "/2.jpg",
    id: 2,
    link: "/messages/2",
  },
  {
    name: "Maxime",
    img: "/3.jpg",
    id: 3,
    link: "/messages/3",
  },
];

  type ChannelType = {
    name: string;
    id: number;
    type: "text" | "voice" | "cam";
    serverId: number | string;
  };

type ServersType = {
  name: string;
  link: string;
  id: number;
  img?: string;
};

const Servers : ServersType[] = [
  {
    name: "Suihira",
    link: "/servers/1/1",
    id: 1,
  },
  {
    name: "Sip of life",
    link: "/servers/2/1",
    img: "/2.jpg",
    id: 2,
  },
  {
    name: "Quentin's server",
    link: "/servers/3/1",
    img: "/3.jpg",
    id: 3,
  },
];

  type ChannelType = {
    name: string;
    id: number;
    type: "text" | "voice" | "cam";
    serverId: number | string;
  };

const Channels : ChannelType[] = [
  {
    name: "Général",
    id: 1,
    type: "text",
    serverId: 1,
  },
  {
    name: "Cam",
    id: 4,
    type: "cam",
    serverId: 1,
  },
  {
    name: "Selfies",
    id: 2,
    type: "text",
    serverId: 2,
  },
  {
    name: "Voc",
    id: 3,
    type: "voice",
    serverId: 2,
  },
];

const messages= [
  {
    message: "Salut",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:00",
  },
  {
    message: "Salut",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:01",
  },
  {
    message: "ça va ?",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:02",
  },
  {
    message: "Oui et toi ?",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:03",
  },
  {
    message: "Oui très bien merci",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:04",
  },
  {
    message: "ok salut",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:05",
  },
  {
    message: "Salut",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:00",
  },
  {
    message: "Salut",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:01",
  },
  {
    message: "ça va ?",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:02",
  },
  {
    message: "Oui et toi ?",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:03",
  },
  {
    message: "Oui très bien merci",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:04",
  },
  {
    message: "ok salut",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:05",
  },
  {
    message: "Salut",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:00",
  },
  {
    message: "Salut",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:01",
  },
  {
    message: "ça va ?",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:02",
  },
  {
    message: "Oui et toi ?",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:03",
  },
  {
    message: "Oui très bien merci",
    sender: {
      name: "John Doe",
      img: "/1.jpg",
    },
    date: "12:04",
  },
  {
    message: "ok salut",
    sender: {
      name: "Quentin",
      img: "/2.jpg",
    },
    date: "12:05",
  },
];

export { Servers, Friends, Channels, messages};