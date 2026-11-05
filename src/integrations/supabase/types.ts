export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          created_at: string
          description: string
          expiry_date: string | null
          file_path: string
          file_type: string
          file_url: string
          id: string
          issue_date: string | null
          issuing_organisation: string
          name: string
          publicly_visible: boolean
        }
        Insert: {
          created_at?: string
          description?: string
          expiry_date?: string | null
          file_path: string
          file_type?: string
          file_url: string
          id?: string
          issue_date?: string | null
          issuing_organisation?: string
          name: string
          publicly_visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string
          expiry_date?: string | null
          file_path?: string
          file_type?: string
          file_url?: string
          id?: string
          issue_date?: string | null
          issuing_organisation?: string
          name?: string
          publicly_visible?: boolean
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          admin_read_at: string
          archived: boolean
          created_at: string
          email: string
          id: string
          last_visitor_at: string | null
          name: string
          token_hash: string
        }
        Insert: {
          admin_read_at?: string
          archived?: boolean
          created_at?: string
          email: string
          id?: string
          last_visitor_at?: string | null
          name: string
          token_hash: string
        }
        Update: {
          admin_read_at?: string
          archived?: boolean
          created_at?: string
          email?: string
          id?: string
          last_visitor_at?: string | null
          name?: string
          token_hash?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          sender: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          sender: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          archived: boolean
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      messaging_rate_limits: {
        Row: {
          hits: number
          key: string
          started_at: string
        }
        Insert: {
          hits?: number
          key: string
          started_at?: string
        }
        Update: {
          hits?: number
          key?: string
          started_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string
          created_at: string
          customer_name: string
          id: string
          items: Json
          notes: string | null
          phone: string
          status: string
          total: number
        }
        Insert: {
          address: string
          created_at?: string
          customer_name: string
          id?: string
          items: Json
          notes?: string | null
          phone: string
          status?: string
          total: number
        }
        Update: {
          address?: string
          created_at?: string
          customer_name?: string
          id?: string
          items?: Json
          notes?: string | null
          phone?: string
          status?: string
          total?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean
          catalogue_visible: boolean
          category: string
          created_at: string
          description: string
          documentation_url: string
          featured: boolean
          id: string
          image_url: string | null
          intended_use: string
          name: string
          price: number
          requires_prescription: boolean
          specifications: string
          stock: number
          tag: string | null
        }
        Insert: {
          active?: boolean
          catalogue_visible?: boolean
          category?: string
          created_at?: string
          description?: string
          documentation_url?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          intended_use?: string
          name: string
          price?: number
          requires_prescription?: boolean
          specifications?: string
          stock?: number
          tag?: string | null
        }
        Update: {
          active?: boolean
          catalogue_visible?: boolean
          category?: string
          created_at?: string
          description?: string
          documentation_url?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          intended_use?: string
          name?: string
          price?: number
          requires_prescription?: boolean
          specifications?: string
          stock?: number
          tag?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string
          admin_last_seen: string | null
          announcement: string
          business_description: string
          canonical_origin: string
          contact_seo_description: string
          contact_seo_title: string
          currency: string
          delivery_fee: number
          email: string
          free_delivery_over: number
          home_intro: string
          home_seo_description: string
          home_seo_title: string
          hours: string
          id: number
          pharmacy_name: string
          phone: string
          public_contact_verified: boolean
          quality_text: string
          services_text: string
          shop_seo_description: string
          shop_seo_title: string
        }
        Insert: {
          address?: string
          admin_last_seen?: string | null
          announcement?: string
          business_description?: string
          canonical_origin?: string
          contact_seo_description?: string
          contact_seo_title?: string
          currency?: string
          delivery_fee?: number
          email?: string
          free_delivery_over?: number
          home_intro?: string
          home_seo_description?: string
          home_seo_title?: string
          hours?: string
          id?: number
          pharmacy_name?: string
          phone?: string
          public_contact_verified?: boolean
          quality_text?: string
          services_text?: string
          shop_seo_description?: string
          shop_seo_title?: string
        }
        Update: {
          address?: string
          admin_last_seen?: string | null
          announcement?: string
          business_description?: string
          canonical_origin?: string
          contact_seo_description?: string
          contact_seo_title?: string
          currency?: string
          delivery_fee?: number
          email?: string
          free_delivery_over?: number
          home_intro?: string
          home_seo_description?: string
          home_seo_title?: string
          hours?: string
          id?: number
          pharmacy_name?: string
          phone?: string
          public_contact_verified?: boolean
          quality_text?: string
          services_text?: string
          shop_seo_description?: string
          shop_seo_title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consume_messaging_limit: {
        Args: { max_hits: number; rate_key: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
