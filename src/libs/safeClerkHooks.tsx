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
	if (process.env.NODE_ENV !== 'production') {
		console.warn('⚠️ useUser() called while Clerk is disabled — returning mock user.')
	}
	return { isLoaded: true, isSignedIn: false, user: null }
}

function useClerkMock() {
	if (process.env.NODE_ENV !== 'production') {
		console.warn('⚠️ useClerk() called while Clerk is disabled — returning mock client.')
	}
	return {
		openSignIn: () => console.warn('Mock: openSignIn() called'),
		signOut: () => console.warn('Mock: signOut() called'),
	}
}

export const useUser = (): SafeUserResult => {
	try {
		if (!isClerkEnabled) return useUserMock()
		return useClerkUser() as unknown as SafeUserResult
	} catch (err) {
		console.warn('⚠️ useUser() failed, falling back to mock mode:', err)
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
		console.warn('⚠️ useClerk() failed, falling back to mock mode:', err)
		if (process.env.NODE_ENV === 'production') {
			throw err
		}
		return useClerkMock()
	}
}
