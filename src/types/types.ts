export interface HomePageProps {
  email: string;
  id: number;
  title: string;
  subtitle: string;
  info : string;
  ratingOfSalon : [
    {
      name : string,
      ambience : number,
      cleanliness : number,
      staff : number,
      id: number,
      date: string,
      user: string,
      desc: string
    },
  ],
  aboutSalonInfo : [
    {
      desc : string
      openingHours : [
        {
          monday : string,
          tuesday : string,
          wednesday : string,
          thursday : string,
          friday : string,
          saturday : string,
          sunday : string
        }
      ],
      contact : string,
      additionalInfo : [
        {
          pay : string,
          parking : string,
          wifi : string,
          access : string,
          child : string,
          pets : string
        }
      ],
      accordion : [
        {
          paymentolicy :string,
          brandsUsed :  string
        }
      ]
    }
  ],
  type: [
    {
      id : number,
      typeOfTreatment : string;
      price: number;
      time: string;
      details: string;
    }
  ],
  place: string;
  img: string;
  moreImages: [
    {
      url:string;
      caption: string;
    }
  ],
 team: [
    {
     name : string;
     proffesion :string;
     rating : number;
     userImg : string;
    }
  ],
  city: string;
  adress: string;
  date : string;
  time : string;
  company : string;
  treatment : string;
  latitude: number,
  longitude: number,
}

export interface Benefit {
  imgB: string;
  titleB: string;
  descB: string;
}

export interface City {
  city: string;
}
type Appointment = {
  checked: string;
  totalPrice: number;
  place: string,
  id: number,
  address : string,
  image : string,
  selectedEmployee: string | null;
  selectedDate: string;
  selectedTime: string;
  appointmentId: number;
};

export interface Login {
  email: string;
  password: string;
  id: number;
  name: string;
  surname: string;
  number: string;
  gender: string;
  birthDate: string;
  address: string;
  imgP: string;
  activeMemberships : [
    {
      time :string,
      treatment : string,
      sessions : string,
      service : string,
      price : string,
      place : string,
    }
  ],
  appointments: Appointment[];
  paymentMethods: [
    {
      paymentCard: string;
      cardNumber: number;
      expiration: string;
      cvv: string;
    }
  ]
}
