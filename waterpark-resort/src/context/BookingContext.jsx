import { createContext, useContext, useState } from 'react';
import { BOOKING_PRICING } from '../data/siteData';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [selectedResort, setSelectedResort] = useState(null);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [date, setDate] = useState('');
  const [travelAssistance, setTravelAssistance] = useState(false);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  const totalMembers = adults + kids;

  // Price calculation
  const adultTotal = () => selectedResort ? (selectedResort.price * adults) : 0;
  const kidsTotal = () => BOOKING_PRICING.KIDS_PRICE * kids;
  const travelTotal = () =>
    travelAssistance && totalMembers >= BOOKING_PRICING.TRAVEL_MIN_MEMBERS
      ? BOOKING_PRICING.TRAVEL_PRICE * totalMembers
      : 0;


  const finalTotal = () => adultTotal() + kidsTotal() + travelTotal();
  const advanceAmount = () => BOOKING_PRICING.ADVANCE_PER_PERSON * totalMembers;
  const remainingAmount = () => finalTotal() - advanceAmount();

  const canUseTravelAssistance = totalMembers >= BOOKING_PRICING.TRAVEL_MIN_MEMBERS;

  const resetBooking = () => {
    setAdults(1);
    setKids(0);
    setDate('');
    setTravelAssistance(false);

    setName('');
    setMobile('');
    setEmail('');
    setSpecialNote('');
  };

  return (
    <BookingContext.Provider value={{
      selectedResort, setSelectedResort,
      adults, setAdults,
      kids, setKids,
      date, setDate,
      travelAssistance, setTravelAssistance,

      name, setName,
      mobile, setMobile,
      email, setEmail,
      specialNote, setSpecialNote,
      totalMembers,
      canUseTravelAssistance,
      adultTotal, kidsTotal, travelTotal,
      finalTotal, advanceAmount, remainingAmount,
      BOOKING_PRICING,
      resetBooking,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
