'use client'

import {
	useUser as useClerkUser,
	useClerk as useClerkClient,
} from '@clerk/nextjs'
import { isClerkEnabled } from '@/libs/safeClerk'

interface SafeUser {
	id?: string
	firstName?: string
	primaryEmailAddress?: {
		emailAddress?: string
	}
	hasImage?: boolean
	imageUrl?: string
}

interface SafeUserResult {
	isLoaded: boolean
	isSignedIn: boolean
	user: SafeUser | null
}

function useUserMock(): SafeUserResult {
	return { isLoaded: true, isSignedIn: false, user: null }
}

function useClerkMock() {
	return {
		openSignIn: () => {},
		signOut: () => {},
	}
}

export const useUser = (): SafeUserResult => {
	try {
		if (!isClerkEnabled) return useUserMock()
		return useClerkUser() as unknown as SafeUserResult
	} catch (err) {
		if (process.env.NODE_ENV === 'production') {
			throw err
		}
		return useUserMock()
	}
}

export const useClerk = () => {
	try {
		if (!isClerkEnabled) return useClerkMock()
		return useClerkClient()
	} catch (err) {
		if (process.env.NODE_ENV === 'production') {
			throw err
		}
		return useClerkMock()
	}
}
