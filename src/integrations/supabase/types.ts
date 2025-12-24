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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          content: string
          cover_image: string | null
          created_at: string
          id: string
          is_published: boolean | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content: string
          cover_image?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cars: {
        Row: {
          body_type: Database["public"]["Enums"]["body_type"]
          condition: Database["public"]["Enums"]["car_condition"]
          created_at: string
          description: string | null
          discount_price: number | null
          engine: string | null
          exterior_color: string | null
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id: string
          images: string[] | null
          inspection_notes: string | null
          interior_color: string | null
          is_featured: boolean | null
          is_negotiable: boolean | null
          is_new_arrival: boolean | null
          is_top_deal: boolean | null
          location: string | null
          main_image: string | null
          make: string
          meta_description: string | null
          meta_title: string | null
          mileage: number | null
          model: string
          price: number
          status: Database["public"]["Enums"]["car_status"]
          stock_id: string | null
          transmission: Database["public"]["Enums"]["transmission_type"]
          trim: string | null
          updated_at: string
          vin: string | null
          year: number
        }
        Insert: {
          body_type?: Database["public"]["Enums"]["body_type"]
          condition?: Database["public"]["Enums"]["car_condition"]
          created_at?: string
          description?: string | null
          discount_price?: number | null
          engine?: string | null
          exterior_color?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          images?: string[] | null
          inspection_notes?: string | null
          interior_color?: string | null
          is_featured?: boolean | null
          is_negotiable?: boolean | null
          is_new_arrival?: boolean | null
          is_top_deal?: boolean | null
          location?: string | null
          main_image?: string | null
          make: string
          meta_description?: string | null
          meta_title?: string | null
          mileage?: number | null
          model: string
          price: number
          status?: Database["public"]["Enums"]["car_status"]
          stock_id?: string | null
          transmission?: Database["public"]["Enums"]["transmission_type"]
          trim?: string | null
          updated_at?: string
          vin?: string | null
          year: number
        }
        Update: {
          body_type?: Database["public"]["Enums"]["body_type"]
          condition?: Database["public"]["Enums"]["car_condition"]
          created_at?: string
          description?: string | null
          discount_price?: number | null
          engine?: string | null
          exterior_color?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          images?: string[] | null
          inspection_notes?: string | null
          interior_color?: string | null
          is_featured?: boolean | null
          is_negotiable?: boolean | null
          is_new_arrival?: boolean | null
          is_top_deal?: boolean | null
          location?: string | null
          main_image?: string | null
          make?: string
          meta_description?: string | null
          meta_title?: string | null
          mileage?: number | null
          model?: string
          price?: number
          status?: Database["public"]["Enums"]["car_status"]
          stock_id?: string | null
          transmission?: Database["public"]["Enums"]["transmission_type"]
          trim?: string | null
          updated_at?: string
          vin?: string | null
          year?: number
        }
        Relationships: []
      }
      leads: {
        Row: {
          car_id: string | null
          created_at: string
          email: string
          id: string
          lead_type: Database["public"]["Enums"]["lead_type"]
          message: string | null
          name: string
          notes: string | null
          phone: string
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
        }
        Insert: {
          car_id?: string | null
          created_at?: string
          email: string
          id?: string
          lead_type?: Database["public"]["Enums"]["lead_type"]
          message?: string | null
          name: string
          notes?: string | null
          phone: string
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Update: {
          car_id?: string | null
          created_at?: string
          email?: string
          id?: string
          lead_type?: Database["public"]["Enums"]["lead_type"]
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string | null
          business_hours: string | null
          created_at: string
          email: string | null
          facebook: string | null
          hero_headline: string | null
          hero_subtext: string | null
          id: string
          instagram: string | null
          logo: string | null
          phone: string | null
          twitter: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: string | null
          created_at?: string
          email?: string | null
          facebook?: string | null
          hero_headline?: string | null
          hero_subtext?: string | null
          id?: string
          instagram?: string | null
          logo?: string | null
          phone?: string | null
          twitter?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: string | null
          created_at?: string
          email?: string | null
          facebook?: string | null
          hero_headline?: string | null
          hero_subtext?: string | null
          id?: string
          instagram?: string | null
          logo?: string | null
          phone?: string | null
          twitter?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          car_purchased: string | null
          content: string
          created_at: string
          id: string
          is_approved: boolean | null
          location: string | null
          name: string
          photo: string | null
          rating: number
        }
        Insert: {
          car_purchased?: string | null
          content: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          location?: string | null
          name: string
          photo?: string | null
          rating?: number
        }
        Update: {
          car_purchased?: string | null
          content?: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          location?: string | null
          name?: string
          photo?: string | null
          rating?: number
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "staff"
      body_type:
        | "sedan"
        | "suv"
        | "coupe"
        | "truck"
        | "bus"
        | "hatchback"
        | "wagon"
        | "convertible"
      car_condition: "brand_new" | "foreign_used" | "nigerian_used"
      car_status: "available" | "reserved" | "sold"
      fuel_type: "petrol" | "diesel" | "hybrid" | "electric"
      lead_status: "new" | "contacted" | "closed"
      lead_type:
        | "general_inquiry"
        | "viewing_request"
        | "financing_request"
        | "trade_in"
        | "sell_car"
      transmission_type: "automatic" | "manual"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "staff"],
      body_type: [
        "sedan",
        "suv",
        "coupe",
        "truck",
        "bus",
        "hatchback",
        "wagon",
        "convertible",
      ],
      car_condition: ["brand_new", "foreign_used", "nigerian_used"],
      car_status: ["available", "reserved", "sold"],
      fuel_type: ["petrol", "diesel", "hybrid", "electric"],
      lead_status: ["new", "contacted", "closed"],
      lead_type: [
        "general_inquiry",
        "viewing_request",
        "financing_request",
        "trade_in",
        "sell_car",
      ],
      transmission_type: ["automatic", "manual"],
    },
  },
} as const
