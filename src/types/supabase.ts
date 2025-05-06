export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      maintenance_requests: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          unit: string
          category: string
          description: string
          status: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          unit: string
          category: string
          description: string
          status?: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          unit?: string
          category?: string
          description?: string
          status?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string
          full_name: string | null
          role: string | null
        }
        Insert: {
          id: string
          updated_at?: string
          full_name?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          updated_at?: string
          full_name?: string | null
          role?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
