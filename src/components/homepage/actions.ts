'use server'

import {redirect} from 'next/navigation'

export async function navigateMapLatLng(lat: number, lng: number) {
  redirect(`/skate-spot-map/?lat=${lat}&lng=${lng}`)
}