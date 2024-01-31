import { useEffect, useState } from "react";

export const useFetchData = <T>(initialValue: string) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(initialValue);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [initialValue]);

  return data;
};

interface Checked {
  [key: string]: boolean;
}


const booking = 'bookingData';

export const useBooking = () => {
  const [checked, setChecked] = useState<Checked>(() => {
    const storedChecked = localStorage.getItem(booking);
    return storedChecked ? JSON.parse(storedChecked).checked : {};
  });
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(() => {
    const storedChecked = localStorage.getItem(booking);
    return storedChecked ? JSON.parse(storedChecked).totalPrice : 0;
  });


  useEffect(() => {
    localStorage.setItem(
      booking,
      JSON.stringify({ checked, totalPrice })
    );
  }, [checked, totalPrice]);

  const handleAddToBook = (id: string | number, price: number) => {
    const updatedChecked = {
      ...checked,
      [id]: !checked[id],
    };
    setChecked(updatedChecked);

    if (checked[id]) {
      setSelectedServices(
        selectedServices.filter((serviceId) => serviceId.id !== id)
      );
      setTotalPrice((prevTotal) => prevTotal - price);
    } else {
      setSelectedServices([...selectedServices, id]);
      setTotalPrice((prevTotal) => prevTotal + price);
    }
  };

  return {
    checked,
    setChecked,
    setTotalPrice,
    selectedServices,
    totalPrice,
    handleAddToBook,
  };
};
