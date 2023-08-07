import React from 'react'
import { Card } from '~/components/Card'

import { getFriends } from '~/services/DatabaseService'

export const revalidate = 60

export default async function Home() {
  const response = await getFriends()
  return (
    <main className="flex flex-col items-center min-h-screen gap-6 p-24">
      {response.error && <p className="text-white">{response.error?.message}</p>}
      {response.data?.map(el => {
        const data = {
          content: el.current_game,
          highlight: '',
          pillText: el.score,
          title: el.name,
        }
        return <Card key={el.id} data={data} />
      })}
    </main>
  )
}
