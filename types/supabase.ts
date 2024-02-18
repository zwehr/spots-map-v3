export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      parks: {
        Row: {
          building_affiliates: string[]
          city: string
          country: string
          created_at: string
          id: number
          image_links: string[] | null
          lat: number
          lng: number
          name: string
          year: number | null
        }
        Insert: {
          building_affiliates: string[]
          city: string
          country: string
          created_at?: string
          id?: number
          image_links?: string[] | null
          lat: number
          lng: number
          name: string
          year?: number | null
        }
        Update: {
          building_affiliates?: string[]
          city?: string
          country?: string
          created_at?: string
          id?: number
          image_links?: string[] | null
          lat?: number
          lng?: number
          name?: string
          year?: number | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: string
          role: string
        }
        Insert: {
          id: string
          role: string
        }
        Update: {
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      spot_likes: {
        Row: {
          created_at: string
          id: number
          spot_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          spot_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          spot_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spot_likes_spot_id_fkey"
            columns: ["spot_id"]
            isOneToOne: false
            referencedRelation: "spots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spot_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      spots: {
        Row: {
          city: string | null
          created_at: string
          description: string | null
          featured_in: number[] | null
          id: number
          image_links: string[] | null
          is_premium: boolean | null
          lat: number | null
          lng: number | null
          name: string | null
          status: string | null
          tags: string[] | null
          type: string | null
          youtube_links: string[] | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          description?: string | null
          featured_in?: number[] | null
          id?: number
          image_links?: string[] | null
          is_premium?: boolean | null
          lat?: number | null
          lng?: number | null
          name?: string | null
          status?: string | null
          tags?: string[] | null
          type?: string | null
          youtube_links?: string[] | null
        }
        Update: {
          city?: string | null
          created_at?: string
          description?: string | null
          featured_in?: number[] | null
          id?: number
          image_links?: string[] | null
          is_premium?: boolean | null
          lat?: number | null
          lng?: number | null
          name?: string | null
          status?: string | null
          tags?: string[] | null
          type?: string | null
          youtube_links?: string[] | null
        }
        Relationships: []
      }
      spots_videos: {
        Row: {
          id: number
          spot_id: number
          video_id: number
        }
        Insert: {
          id?: number
          spot_id: number
          video_id: number
        }
        Update: {
          id?: number
          spot_id?: number
          video_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "spots_videos_spot_id_fkey"
            columns: ["spot_id"]
            isOneToOne: false
            referencedRelation: "spots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spots_videos_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          }
        ]
      }
      videos: {
        Row: {
          company: string | null
          created_at: string
          id: number
          release_year: number
          thumbnail_image_url: string
          title: string
          youtube_embed_link: string
          youtube_link: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          id?: number
          release_year: number
          thumbnail_image_url: string
          title: string
          youtube_embed_link: string
          youtube_link: string
        }
        Update: {
          company?: string | null
          created_at?: string
          id?: number
          release_year?: number
          thumbnail_image_url?: string
          title?: string
          youtube_embed_link?: string
          youtube_link?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
