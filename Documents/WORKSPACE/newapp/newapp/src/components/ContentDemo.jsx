import React, { createContext } from 'react'
const moneyFromGrand = createContext()

export default function ContentDemo() {
    const [money, setMoney] = useState('2 toi')
  return (
        <moneyFromGrand.Provider value={money}>
            <ComChild />
        </moneyFromGrand.Provider>


            )
}



            function ComGrand(){
    return <ComParent />
}

            function ComParent(){
    return <ComChild />
}

            function ComChild(){
    const valueFromContext= useContent(moneyFromGrand)
            return <p>{valueFromContext}</p>
}
