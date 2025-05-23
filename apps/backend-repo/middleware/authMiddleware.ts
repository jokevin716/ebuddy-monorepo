import { Request, Response, NextFunction } from 'express'
import { auth } from '../config/firebaseConfig'

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string
    email?: string
  }
}

export const authMiddleware = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized - No token provided' })
      return
    }

    const token = authHeader.split('Bearer ')[1]

    if(!token) {
      res.status(401).json({ error: 'Unauthorized - Invalid token format' })
      return
    }

    try {
      const decodedToken = await auth.verifyIdToken(token)

      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      }

      next()
    }
    catch(err) {
      console.error('Token verification error: ', err)
      res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }
  }
  catch(err) {
    console.error('Auth middleware error:', err)
    res.status(500).json({ error: 'Internal server error during authentication' })
  }
}