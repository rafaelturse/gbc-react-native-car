import React, { createContext, useState, useContext } from "react"

const ReservationsContext = createContext()

export const ReservationsContextProvider = ({ children }) => {
  const [reservations, setReservations] = useState([])

  return (
    <ReservationsContext.Provider value={{ reservations, setReservations }}>
      {children}
    </ReservationsContext.Provider>
  )
}

export const useReservationsContext = () => useContext(ReservationsContext)
