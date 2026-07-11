// Generated from the shared Supabase project (see humankind-app: npx supabase gen types typescript --linked). Regenerate there and copy here when the schema changes.
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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      account_activation_codes: {
        Row: {
          attempts: number
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          status: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          attempts?: number
          code: string
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          status?: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          attempts?: number
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          status?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      account_links: {
        Row: {
          accepted_at: string | null
          child_user_id: string
          created_at: string
          id: string
          linked_by: string | null
          parent_user_id: string
          status: string
        }
        Insert: {
          accepted_at?: string | null
          child_user_id: string
          created_at?: string
          id?: string
          linked_by?: string | null
          parent_user_id: string
          status?: string
        }
        Update: {
          accepted_at?: string | null
          child_user_id?: string
          created_at?: string
          id?: string
          linked_by?: string | null
          parent_user_id?: string
          status?: string
        }
        Relationships: []
      }
      affiliate_balances: {
        Row: {
          affiliate_id: string
          available_balance: number
          id: string
          lifetime_applied: number
          lifetime_earned: number
          lifetime_paid_out: number
          pending_balance: number
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          available_balance?: number
          id?: string
          lifetime_applied?: number
          lifetime_earned?: number
          lifetime_paid_out?: number
          pending_balance?: number
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          available_balance?: number
          id?: string
          lifetime_applied?: number
          lifetime_earned?: number
          lifetime_paid_out?: number
          pending_balance?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_balances_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: true
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_blocked_names: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      affiliate_membership_credits: {
        Row: {
          affiliate_id: string
          amount_applied: number
          applied_at: string
          billing_period: string
          id: string
        }
        Insert: {
          affiliate_id: string
          amount_applied: number
          applied_at?: string
          billing_period: string
          id?: string
        }
        Update: {
          affiliate_id?: string
          amount_applied?: number
          applied_at?: string
          billing_period?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_membership_credits_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_payouts: {
        Row: {
          affiliate_id: string
          amount: number
          id: string
          method: string
          notes: string | null
          paypal_email: string | null
          processed_at: string | null
          requested_at: string
          status: string
        }
        Insert: {
          affiliate_id: string
          amount: number
          id?: string
          method?: string
          notes?: string | null
          paypal_email?: string | null
          processed_at?: string | null
          requested_at?: string
          status?: string
        }
        Update: {
          affiliate_id?: string
          amount?: number
          id?: string
          method?: string
          notes?: string | null
          paypal_email?: string | null
          processed_at?: string | null
          requested_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_payouts_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_referrals: {
        Row: {
          affiliate_id: string
          commission_amount: number
          commission_month: number
          commission_rate: number
          confirmed_at: string | null
          created_at: string
          id: string
          membership_tier: string | null
          referred_user_id: string
          source: string | null
          status: string
        }
        Insert: {
          affiliate_id: string
          commission_amount?: number
          commission_month?: number
          commission_rate?: number
          confirmed_at?: string | null
          created_at?: string
          id?: string
          membership_tier?: string | null
          referred_user_id: string
          source?: string | null
          status?: string
        }
        Update: {
          affiliate_id?: string
          commission_amount?: number
          commission_month?: number
          commission_rate?: number
          confirmed_at?: string | null
          created_at?: string
          id?: string
          membership_tier?: string | null
          referred_user_id?: string
          source?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_referrals_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_referrals_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          affiliate_name: string
          created_at: string
          custom_rate: number | null
          display_name: string | null
          id: string
          is_active: boolean
          level: string
          recurring_months: number
          updated_at: string
          user_id: string
        }
        Insert: {
          affiliate_name: string
          created_at?: string
          custom_rate?: number | null
          display_name?: string | null
          id?: string
          is_active?: boolean
          level?: string
          recurring_months?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          affiliate_name?: string
          created_at?: string
          custom_rate?: number | null
          display_name?: string | null
          id?: string
          is_active?: boolean
          level?: string
          recurring_months?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          body: string
          context_id: string | null
          context_type: string | null
          created_at: string
          created_by: string
          id: string
          kind: string
          metadata: Json | null
          severity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          body?: string
          context_id?: string | null
          context_type?: string | null
          created_at?: string
          created_by: string
          id?: string
          kind: string
          metadata?: Json | null
          severity?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          body?: string
          context_id?: string | null
          context_type?: string | null
          created_at?: string
          created_by?: string
          id?: string
          kind?: string
          metadata?: Json | null
          severity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          anonymized_at: string | null
          created_at: string
          device: string | null
          environment: string | null
          event_category: string
          event_name: string
          event_version: number
          id: string
          ip_hash: string | null
          occurred_at: string
          properties: Json
          session_id: string | null
          source: string | null
          user_agent: string | null
          user_id: string | null
          user_tier: string | null
          viewer_profile_id: string | null
        }
        Insert: {
          anonymized_at?: string | null
          created_at?: string
          device?: string | null
          environment?: string | null
          event_category: string
          event_name: string
          event_version?: number
          id?: string
          ip_hash?: string | null
          occurred_at?: string
          properties?: Json
          session_id?: string | null
          source?: string | null
          user_agent?: string | null
          user_id?: string | null
          user_tier?: string | null
          viewer_profile_id?: string | null
        }
        Update: {
          anonymized_at?: string | null
          created_at?: string
          device?: string | null
          environment?: string | null
          event_category?: string
          event_name?: string
          event_version?: number
          id?: string
          ip_hash?: string | null
          occurred_at?: string
          properties?: Json
          session_id?: string | null
          source?: string | null
          user_agent?: string | null
          user_id?: string | null
          user_tier?: string | null
          viewer_profile_id?: string | null
        }
        Relationships: []
      }
      analytics_unknown_events: {
        Row: {
          attempted_category: string | null
          created_at: string
          environment: string
          event_name: string
          id: string
          raw_payload: Json
          route: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          attempted_category?: string | null
          created_at?: string
          environment: string
          event_name: string
          id?: string
          raw_payload: Json
          route?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          attempted_category?: string | null
          created_at?: string
          environment?: string
          event_name?: string
          id?: string
          raw_payload?: Json
          route?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_login_attempts: {
        Row: {
          admin_notified_at: string | null
          created_at: string
          email: string
          error_message: string | null
          id: string
          ip_address: string | null
          success: boolean
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          admin_notified_at?: string | null
          created_at?: string
          email: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notified_at?: string | null
          created_at?: string
          email?: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      broadcast_channel_sources: {
        Row: {
          channel_id: string
          created_at: string
          id: string
          is_active: boolean
          label: string
          last_synced_at: string | null
          rotation_order: number
          showcase_id: string
          updated_at: string
        }
        Insert: {
          channel_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          label: string
          last_synced_at?: string | null
          rotation_order?: number
          showcase_id: string
          updated_at?: string
        }
        Update: {
          channel_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          label?: string
          last_synced_at?: string | null
          rotation_order?: number
          showcase_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_channel_sources_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "broadcast_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_channels: {
        Row: {
          broadcast_day_start: string
          channel_type: string
          created_at: string
          description: string | null
          enabled: boolean
          id: string
          interrupt_live_streams: boolean
          interrupt_notice_minutes: number
          slug: string
          timezone: string
          title: string
          updated_at: string
        }
        Insert: {
          broadcast_day_start?: string
          channel_type?: string
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          interrupt_live_streams?: boolean
          interrupt_notice_minutes?: number
          slug: string
          timezone?: string
          title: string
          updated_at?: string
        }
        Update: {
          broadcast_day_start?: string
          channel_type?: string
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          interrupt_live_streams?: boolean
          interrupt_notice_minutes?: number
          slug?: string
          timezone?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      broadcast_program_items: {
        Row: {
          access: string
          bumper_type: string | null
          channel_id: string
          content_type: string
          created_at: string
          daypart: string
          description: string | null
          duration: number
          id: string
          is_enabled: boolean
          meta: Json
          sort_order: number
          source_id: string | null
          thumbnail: string | null
          title: string
          updated_at: string
          video_id: string | null
        }
        Insert: {
          access?: string
          bumper_type?: string | null
          channel_id: string
          content_type?: string
          created_at?: string
          daypart?: string
          description?: string | null
          duration?: number
          id?: string
          is_enabled?: boolean
          meta?: Json
          sort_order?: number
          source_id?: string | null
          thumbnail?: string | null
          title: string
          updated_at?: string
          video_id?: string | null
        }
        Update: {
          access?: string
          bumper_type?: string | null
          channel_id?: string
          content_type?: string
          created_at?: string
          daypart?: string
          description?: string | null
          duration?: number
          id?: string
          is_enabled?: boolean
          meta?: Json
          sort_order?: number
          source_id?: string | null
          thumbnail?: string | null
          title?: string
          updated_at?: string
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_program_items_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "broadcast_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcast_program_items_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "broadcast_channel_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_queue: {
        Row: {
          access: string | null
          content_type: string | null
          created_at: string | null
          duration: number | null
          id: string
          sort_order: number | null
          thumbnail: string | null
          title: string
          video_id: string
        }
        Insert: {
          access?: string | null
          content_type?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          sort_order?: number | null
          thumbnail?: string | null
          title: string
          video_id: string
        }
        Update: {
          access?: string | null
          content_type?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          sort_order?: number | null
          thumbnail?: string | null
          title?: string
          video_id?: string
        }
        Relationships: []
      }
      chat_message_authors: {
        Row: {
          channel: string
          created_at: string | null
          discord_message_id: string
          user_id: string
        }
        Insert: {
          channel?: string
          created_at?: string | null
          discord_message_id: string
          user_id: string
        }
        Update: {
          channel?: string
          created_at?: string | null
          discord_message_id?: string
          user_id?: string
        }
        Relationships: []
      }
      checkins: {
        Row: {
          already_scanned: boolean | null
          created_at: string
          event_id: string | null
          event_name: string | null
          event_source: string | null
          event_status: string
          id: string
          notes: string | null
          operator_email: string | null
          operator_phone: string | null
          operator_user_id: string | null
          override: boolean | null
          override_reason: string | null
          qr_type: string | null
          registration_status: string
          scan_location: string | null
          scan_time: string
          scanned_at: string | null
          scanner_user_id: string | null
          ticket_status: string
          user_id: string | null
        }
        Insert: {
          already_scanned?: boolean | null
          created_at?: string
          event_id?: string | null
          event_name?: string | null
          event_source?: string | null
          event_status: string
          id?: string
          notes?: string | null
          operator_email?: string | null
          operator_phone?: string | null
          operator_user_id?: string | null
          override?: boolean | null
          override_reason?: string | null
          qr_type?: string | null
          registration_status: string
          scan_location?: string | null
          scan_time?: string
          scanned_at?: string | null
          scanner_user_id?: string | null
          ticket_status: string
          user_id?: string | null
        }
        Update: {
          already_scanned?: boolean | null
          created_at?: string
          event_id?: string | null
          event_name?: string | null
          event_source?: string | null
          event_status?: string
          id?: string
          notes?: string | null
          operator_email?: string | null
          operator_phone?: string | null
          operator_user_id?: string | null
          override?: boolean | null
          override_reason?: string | null
          qr_type?: string | null
          registration_status?: string
          scan_location?: string | null
          scan_time?: string
          scanned_at?: string | null
          scanner_user_id?: string | null
          ticket_status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checkins_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkins_scanner_user_id_fkey"
            columns: ["scanner_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_votes: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
          vote: number
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          vote: number
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          vote?: number
        }
        Relationships: [
          {
            foreignKeyName: "comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          edited_at: string | null
          id: string
          parent_id: string | null
          updated_at: string | null
          user_id: string | null
          video_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          edited_at?: string | null
          id?: string
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          edited_at?: string | null
          id?: string
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      content_attributes: {
        Row: {
          attribute_key: string
          attribute_value: string
          created_at: string
          created_by: string | null
          id: string
          video_id: string
        }
        Insert: {
          attribute_key: string
          attribute_value: string
          created_at?: string
          created_by?: string | null
          id?: string
          video_id: string
        }
        Update: {
          attribute_key?: string
          attribute_value?: string
          created_at?: string
          created_by?: string | null
          id?: string
          video_id?: string
        }
        Relationships: []
      }
      content_report_involved_users: {
        Row: {
          added_by: string | null
          created_at: string
          id: string
          relationship: string
          report_id: string
          user_id: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          id?: string
          relationship?: string
          report_id: string
          user_id: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          id?: string
          relationship?: string
          report_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_report_involved_users_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "content_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      content_reports: {
        Row: {
          created_at: string
          details: string | null
          id: string
          reason: Database["public"]["Enums"]["report_reason"]
          reporter_id: string | null
          resolution_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["report_status"]
          target_author_id: string | null
          target_id: string
          target_type: Database["public"]["Enums"]["report_target_type"]
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          reason: Database["public"]["Enums"]["report_reason"]
          reporter_id?: string | null
          resolution_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_author_id?: string | null
          target_id: string
          target_type: Database["public"]["Enums"]["report_target_type"]
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          reason?: Database["public"]["Enums"]["report_reason"]
          reporter_id?: string | null
          resolution_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_author_id?: string | null
          target_id?: string
          target_type?: Database["public"]["Enums"]["report_target_type"]
        }
        Relationships: []
      }
      crypto_payment_events: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          intent_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          intent_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crypto_payment_events_intent_id_fkey"
            columns: ["intent_id"]
            isOneToOne: false
            referencedRelation: "crypto_payment_intents"
            referencedColumns: ["id"]
          },
        ]
      }
      crypto_payment_intents: {
        Row: {
          amount_token: number
          amount_usd: number
          chain: string
          confirmed_at: string | null
          created_at: string | null
          expires_at: string
          from_address: string | null
          id: string
          period_months: number
          status: string
          tier: string
          to_address: string
          token: string
          tx_hash: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_token: number
          amount_usd: number
          chain: string
          confirmed_at?: string | null
          created_at?: string | null
          expires_at: string
          from_address?: string | null
          id?: string
          period_months: number
          status?: string
          tier: string
          to_address: string
          token: string
          tx_hash?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_token?: number
          amount_usd?: number
          chain?: string
          confirmed_at?: string | null
          created_at?: string | null
          expires_at?: string
          from_address?: string | null
          id?: string
          period_months?: number
          status?: string
          tier?: string
          to_address?: string
          token?: string
          tx_hash?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      crypto_reminder_log: {
        Row: {
          expires_at: string
          reminder_type: string
          sent_at: string | null
          user_id: string
        }
        Insert: {
          expires_at: string
          reminder_type: string
          sent_at?: string | null
          user_id: string
        }
        Update: {
          expires_at?: string
          reminder_type?: string
          sent_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      department_followers: {
        Row: {
          created_at: string
          department_id: string
          invited_by: string | null
          notification_prefs: Json
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department_id: string
          invited_by?: string | null
          notification_prefs?: Json
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department_id?: string
          invited_by?: string | null
          notification_prefs?: Json
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "department_followers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      department_join_requests: {
        Row: {
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision_note: string | null
          department_id: string
          id: string
          message: string | null
          requested_role: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          department_id: string
          id?: string
          message?: string | null
          requested_role?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          department_id?: string
          id?: string
          message?: string | null
          requested_role?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "department_join_requests_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      department_members: {
        Row: {
          assigned_by: string | null
          department_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          department_id: string
          id?: string
          joined_at?: string
          role: string
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          department_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "department_members_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      department_post_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          parent_id: string | null
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          parent_id?: string | null
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "department_post_replies_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "department_post_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "department_post_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "department_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      department_post_reply_votes: {
        Row: {
          created_at: string
          id: string
          reply_id: string
          updated_at: string
          user_id: string
          vote: number
        }
        Insert: {
          created_at?: string
          id?: string
          reply_id: string
          updated_at?: string
          user_id: string
          vote: number
        }
        Update: {
          created_at?: string
          id?: string
          reply_id?: string
          updated_at?: string
          user_id?: string
          vote?: number
        }
        Relationships: [
          {
            foreignKeyName: "department_post_reply_votes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "department_post_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      department_post_votes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
          vote: number
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
          vote: number
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
          vote?: number
        }
        Relationships: [
          {
            foreignKeyName: "department_post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "department_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      department_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          deleted_at: string | null
          department_id: string
          id: string
          image_urls: string[]
          is_announcement: boolean
          is_pinned: boolean
          reply_count: number
          updated_at: string
          visibility: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          deleted_at?: string | null
          department_id: string
          id?: string
          image_urls?: string[]
          is_announcement?: boolean
          is_pinned?: boolean
          reply_count?: number
          updated_at?: string
          visibility?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          deleted_at?: string | null
          department_id?: string
          id?: string
          image_urls?: string[]
          is_announcement?: boolean
          is_pinned?: boolean
          reply_count?: number
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "department_posts_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      department_proposal_votes: {
        Row: {
          created_at: string
          proposal_id: string
          user_id: string
          vote: number
        }
        Insert: {
          created_at?: string
          proposal_id: string
          user_id: string
          vote: number
        }
        Update: {
          created_at?: string
          proposal_id?: string
          user_id?: string
          vote?: number
        }
        Relationships: [
          {
            foreignKeyName: "department_proposal_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "department_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      department_proposals: {
        Row: {
          author_id: string
          created_at: string
          deleted_at: string | null
          department_id: string
          description: string
          downvote_count: number
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          status: string
          title: string
          updated_at: string
          upvote_count: number
        }
        Insert: {
          author_id: string
          created_at?: string
          deleted_at?: string | null
          department_id: string
          description: string
          downvote_count?: number
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string
          title: string
          updated_at?: string
          upvote_count?: number
        }
        Update: {
          author_id?: string
          created_at?: string
          deleted_at?: string | null
          department_id?: string
          description?: string
          downvote_count?: number
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string
          title?: string
          updated_at?: string
          upvote_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "department_proposals_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      department_settings: {
        Row: {
          accepting_proposals: boolean
          allowed_member_types: string[]
          cover_image_url: string | null
          created_at: string
          department_id: string
          follower_policy: string
          join_approval: string
          linked_event_id: string | null
          linked_livestream_video_id: string | null
          pinned_post_id: string | null
          post_ordering: string
          proposal_window_close_at: string | null
          proposal_window_open_at: string | null
          social_links: Json
          updated_at: string
          visibility: string
          who_can_post: string
          who_can_reply: string
          who_can_submit_proposals: string
          who_can_view_proposals: string
        }
        Insert: {
          accepting_proposals?: boolean
          allowed_member_types?: string[]
          cover_image_url?: string | null
          created_at?: string
          department_id: string
          follower_policy?: string
          join_approval?: string
          linked_event_id?: string | null
          linked_livestream_video_id?: string | null
          pinned_post_id?: string | null
          post_ordering?: string
          proposal_window_close_at?: string | null
          proposal_window_open_at?: string | null
          social_links?: Json
          updated_at?: string
          visibility?: string
          who_can_post?: string
          who_can_reply?: string
          who_can_submit_proposals?: string
          who_can_view_proposals?: string
        }
        Update: {
          accepting_proposals?: boolean
          allowed_member_types?: string[]
          cover_image_url?: string | null
          created_at?: string
          department_id?: string
          follower_policy?: string
          join_approval?: string
          linked_event_id?: string | null
          linked_livestream_video_id?: string | null
          pinned_post_id?: string | null
          post_ordering?: string
          proposal_window_close_at?: string | null
          proposal_window_open_at?: string | null
          social_links?: Json
          updated_at?: string
          visibility?: string
          who_can_post?: string
          who_can_reply?: string
          who_can_submit_proposals?: string
          who_can_view_proposals?: string
        }
        Relationships: [
          {
            foreignKeyName: "department_settings_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: true
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          archived_at: string | null
          avatar_url: string | null
          community_access: string | null
          created_at: string
          created_by: string | null
          department_type: string
          description: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          avatar_url?: string | null
          community_access?: string | null
          created_at?: string
          created_by?: string | null
          department_type?: string
          description?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          avatar_url?: string | null
          community_access?: string | null
          created_at?: string
          created_by?: string | null
          department_type?: string
          description?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      discord_connections: {
        Row: {
          access_token: string | null
          created_at: string | null
          discord_avatar: string | null
          discord_id: string
          discord_username: string | null
          id: string
          refresh_token: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          discord_avatar?: string | null
          discord_id: string
          discord_username?: string | null
          id?: string
          refresh_token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          discord_avatar?: string | null
          discord_id?: string
          discord_username?: string | null
          id?: string
          refresh_token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      door_payments: {
        Row: {
          amount_cents: number
          created_at: string | null
          event_id: string | null
          event_name: string | null
          id: string
          method: string | null
          operator_email: string | null
          operator_phone: string | null
          operator_user_id: string | null
          paid_at: string | null
          payer_email: string | null
          purpose: string | null
          status: string | null
          stripe_session_id: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          event_id?: string | null
          event_name?: string | null
          id?: string
          method?: string | null
          operator_email?: string | null
          operator_phone?: string | null
          operator_user_id?: string | null
          paid_at?: string | null
          payer_email?: string | null
          purpose?: string | null
          status?: string | null
          stripe_session_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          event_id?: string | null
          event_name?: string | null
          id?: string
          method?: string | null
          operator_email?: string | null
          operator_phone?: string | null
          operator_user_id?: string | null
          paid_at?: string | null
          payer_email?: string | null
          purpose?: string | null
          status?: string | null
          stripe_session_id?: string | null
        }
        Relationships: []
      }
      event_guest_tickets: {
        Row: {
          booking_id: string | null
          created_at: string
          email: string | null
          event_id: string
          external_id: string | null
          id: string
          name: string | null
          scanned_at: string | null
          source: string | null
          status: string
          ticket_type: string | null
          token: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          email?: string | null
          event_id: string
          external_id?: string | null
          id?: string
          name?: string | null
          scanned_at?: string | null
          source?: string | null
          status?: string
          ticket_type?: string | null
          token: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          email?: string | null
          event_id?: string
          external_id?: string | null
          id?: string
          name?: string | null
          scanned_at?: string | null
          source?: string | null
          status?: string
          ticket_type?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_guest_tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_insights: {
        Row: {
          created_at: string | null
          direct_purchases: number | null
          event_id: string
          gross_sales: number
          id: string
          members_registered: number | null
          notes: string | null
          page_views: number
          source_platform: string | null
          synced_at: string | null
          tickets_capacity: number
          tickets_free_sold: number
          tickets_paid_sold: number
          tickets_revenue: number | null
          tickets_sold: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          direct_purchases?: number | null
          event_id: string
          gross_sales?: number
          id?: string
          members_registered?: number | null
          notes?: string | null
          page_views?: number
          source_platform?: string | null
          synced_at?: string | null
          tickets_capacity?: number
          tickets_free_sold?: number
          tickets_paid_sold?: number
          tickets_revenue?: number | null
          tickets_sold?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          direct_purchases?: number | null
          event_id?: string
          gross_sales?: number
          id?: string
          members_registered?: number | null
          notes?: string | null
          page_views?: number
          source_platform?: string | null
          synced_at?: string | null
          tickets_capacity?: number
          tickets_free_sold?: number
          tickets_paid_sold?: number
          tickets_revenue?: number | null
          tickets_sold?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      event_promo_codes: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          discount_type: string
          discount_value: number
          ends_at: string | null
          event_id: string
          id: string
          max_uses: number | null
          starts_at: string | null
          used_count: number | null
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          discount_type: string
          discount_value: number
          ends_at?: string | null
          event_id: string
          id?: string
          max_uses?: number | null
          starts_at?: string | null
          used_count?: number | null
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          discount_type?: string
          discount_value?: number
          ends_at?: string | null
          event_id?: string
          id?: string
          max_uses?: number | null
          starts_at?: string | null
          used_count?: number | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          qr_code: string | null
          scanned_at: string | null
          status: string
          ticket_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          qr_code?: string | null
          scanned_at?: string | null
          status: string
          ticket_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          qr_code?: string | null
          scanned_at?: string | null
          status?: string
          ticket_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          agenda: string | null
          created_at: string
          description: string | null
          direct_purchase_enabled: boolean
          direct_purchase_url: string | null
          directions_url: string | null
          ends_at: string | null
          external_event_id: string | null
          external_url: string | null
          id: string
          image_url: string | null
          included_with_membership: boolean
          location: string | null
          map_embed_url: string | null
          members_only: boolean
          overview: string | null
          price_label: string | null
          source_event_id: string | null
          source_platform: string
          starts_at: string | null
          sync_status: string
          ticket_currency: string | null
          ticket_price_cents: number | null
          ticket_url: string | null
          title: string
          updated_at: string
          venue: string | null
          venue_name: string | null
        }
        Insert: {
          agenda?: string | null
          created_at?: string
          description?: string | null
          direct_purchase_enabled?: boolean
          direct_purchase_url?: string | null
          directions_url?: string | null
          ends_at?: string | null
          external_event_id?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          included_with_membership?: boolean
          location?: string | null
          map_embed_url?: string | null
          members_only?: boolean
          overview?: string | null
          price_label?: string | null
          source_event_id?: string | null
          source_platform: string
          starts_at?: string | null
          sync_status?: string
          ticket_currency?: string | null
          ticket_price_cents?: number | null
          ticket_url?: string | null
          title: string
          updated_at?: string
          venue?: string | null
          venue_name?: string | null
        }
        Update: {
          agenda?: string | null
          created_at?: string
          description?: string | null
          direct_purchase_enabled?: boolean
          direct_purchase_url?: string | null
          directions_url?: string | null
          ends_at?: string | null
          external_event_id?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          included_with_membership?: boolean
          location?: string | null
          map_embed_url?: string | null
          members_only?: boolean
          overview?: string | null
          price_label?: string | null
          source_event_id?: string | null
          source_platform?: string
          starts_at?: string | null
          sync_status?: string
          ticket_currency?: string | null
          ticket_price_cents?: number | null
          ticket_url?: string | null
          title?: string
          updated_at?: string
          venue?: string | null
          venue_name?: string | null
        }
        Relationships: []
      }
      governance_anchors: {
        Row: {
          completed_at: string | null
          consensus_at: string | null
          created_at: string
          error_message: string | null
          event_type: string
          id: string
          payload_hash: string
          proposal_id: string
          sequence_number: number | null
          status: string
          topic_id: string
          transaction_id: string | null
          triggered_by: string | null
        }
        Insert: {
          completed_at?: string | null
          consensus_at?: string | null
          created_at?: string
          error_message?: string | null
          event_type: string
          id?: string
          payload_hash: string
          proposal_id: string
          sequence_number?: number | null
          status?: string
          topic_id: string
          transaction_id?: string | null
          triggered_by?: string | null
        }
        Update: {
          completed_at?: string | null
          consensus_at?: string | null
          created_at?: string
          error_message?: string | null
          event_type?: string
          id?: string
          payload_hash?: string
          proposal_id?: string
          sequence_number?: number | null
          status?: string
          topic_id?: string
          transaction_id?: string | null
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "governance_anchors_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "governance_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      governance_profiles: {
        Row: {
          agreed_at: string | null
          agreed_to_guidelines: boolean
          guidelines_version: number
          joined_at: string | null
          opted_in: boolean
          opted_out_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          agreed_at?: string | null
          agreed_to_guidelines?: boolean
          guidelines_version?: number
          joined_at?: string | null
          opted_in?: boolean
          opted_out_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          agreed_at?: string | null
          agreed_to_guidelines?: boolean
          guidelines_version?: number
          joined_at?: string | null
          opted_in?: boolean
          opted_out_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      governance_proposals: {
        Row: {
          audience: string
          blockchain_review_notes: string | null
          blockchain_review_requested_at: string | null
          blockchain_review_requested_by: string | null
          blockchain_review_status: string
          blockchain_reviewed_at: string | null
          blockchain_reviewed_by: string | null
          body: string
          choices: string[]
          closed_anchor_consensus_at: string | null
          closed_anchor_error: string | null
          closed_anchor_payload_hash: string | null
          closed_anchor_seq: number | null
          closed_anchor_status: string | null
          closed_anchor_topic_id: string | null
          closed_at: string | null
          created_anchor_consensus_at: string | null
          created_anchor_error: string | null
          created_anchor_payload_hash: string | null
          created_anchor_seq: number | null
          created_anchor_status: string | null
          created_anchor_topic_id: string | null
          created_at: string
          created_by: string | null
          ends_at: string
          id: string
          include_discussion_thread: boolean
          include_source_submission: boolean
          next_steps: string | null
          next_steps_updated_at: string | null
          next_steps_updated_by: string | null
          notify_on_open: boolean
          quorum_percent: number | null
          requires_wallet: boolean
          starts_at: string
          status: string
          title: string
          updated_at: string
          votes_snapshot_at: string | null
          votes_snapshot_auth_tag: string | null
          votes_snapshot_ciphertext: string | null
          votes_snapshot_iv: string | null
          votes_snapshot_total_votes: number | null
          voting_type: string
        }
        Insert: {
          audience?: string
          blockchain_review_notes?: string | null
          blockchain_review_requested_at?: string | null
          blockchain_review_requested_by?: string | null
          blockchain_review_status?: string
          blockchain_reviewed_at?: string | null
          blockchain_reviewed_by?: string | null
          body?: string
          choices: string[]
          closed_anchor_consensus_at?: string | null
          closed_anchor_error?: string | null
          closed_anchor_payload_hash?: string | null
          closed_anchor_seq?: number | null
          closed_anchor_status?: string | null
          closed_anchor_topic_id?: string | null
          closed_at?: string | null
          created_anchor_consensus_at?: string | null
          created_anchor_error?: string | null
          created_anchor_payload_hash?: string | null
          created_anchor_seq?: number | null
          created_anchor_status?: string | null
          created_anchor_topic_id?: string | null
          created_at?: string
          created_by?: string | null
          ends_at: string
          id?: string
          include_discussion_thread?: boolean
          include_source_submission?: boolean
          next_steps?: string | null
          next_steps_updated_at?: string | null
          next_steps_updated_by?: string | null
          notify_on_open?: boolean
          quorum_percent?: number | null
          requires_wallet?: boolean
          starts_at: string
          status?: string
          title: string
          updated_at?: string
          votes_snapshot_at?: string | null
          votes_snapshot_auth_tag?: string | null
          votes_snapshot_ciphertext?: string | null
          votes_snapshot_iv?: string | null
          votes_snapshot_total_votes?: number | null
          voting_type?: string
        }
        Update: {
          audience?: string
          blockchain_review_notes?: string | null
          blockchain_review_requested_at?: string | null
          blockchain_review_requested_by?: string | null
          blockchain_review_status?: string
          blockchain_reviewed_at?: string | null
          blockchain_reviewed_by?: string | null
          body?: string
          choices?: string[]
          closed_anchor_consensus_at?: string | null
          closed_anchor_error?: string | null
          closed_anchor_payload_hash?: string | null
          closed_anchor_seq?: number | null
          closed_anchor_status?: string | null
          closed_anchor_topic_id?: string | null
          closed_at?: string | null
          created_anchor_consensus_at?: string | null
          created_anchor_error?: string | null
          created_anchor_payload_hash?: string | null
          created_anchor_seq?: number | null
          created_anchor_status?: string | null
          created_anchor_topic_id?: string | null
          created_at?: string
          created_by?: string | null
          ends_at?: string
          id?: string
          include_discussion_thread?: boolean
          include_source_submission?: boolean
          next_steps?: string | null
          next_steps_updated_at?: string | null
          next_steps_updated_by?: string | null
          notify_on_open?: boolean
          quorum_percent?: number | null
          requires_wallet?: boolean
          starts_at?: string
          status?: string
          title?: string
          updated_at?: string
          votes_snapshot_at?: string | null
          votes_snapshot_auth_tag?: string | null
          votes_snapshot_ciphertext?: string | null
          votes_snapshot_iv?: string | null
          votes_snapshot_total_votes?: number | null
          voting_type?: string
        }
        Relationships: []
      }
      governance_settings: {
        Row: {
          default_quorum_percent: number
          id: number
          is_visible: boolean
          updated_at: string
          updated_by: string | null
          voting_audience: string
        }
        Insert: {
          default_quorum_percent?: number
          id?: number
          is_visible?: boolean
          updated_at?: string
          updated_by?: string | null
          voting_audience?: string
        }
        Update: {
          default_quorum_percent?: number
          id?: number
          is_visible?: boolean
          updated_at?: string
          updated_by?: string | null
          voting_audience?: string
        }
        Relationships: []
      }
      governance_votes: {
        Row: {
          choice_index: number
          id: string
          proposal_id: string
          user_id: string
          voted_at: string
        }
        Insert: {
          choice_index: number
          id?: string
          proposal_id: string
          user_id: string
          voted_at?: string
        }
        Update: {
          choice_index?: number
          id?: string
          proposal_id?: string
          user_id?: string
          voted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "governance_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "governance_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_banners: {
        Row: {
          active: boolean
          button1_label: string | null
          button1_url: string | null
          button2_label: string | null
          button2_url: string | null
          created_at: string
          description: string | null
          id: string
          show_phone: boolean
          show_tv: boolean
          show_web: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          button1_label?: string | null
          button1_url?: string | null
          button2_label?: string | null
          button2_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          show_phone?: boolean
          show_tv?: boolean
          show_web?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          button1_label?: string | null
          button1_url?: string | null
          button2_label?: string | null
          button2_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          show_phone?: boolean
          show_tv?: boolean
          show_web?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_items: {
        Row: {
          active: boolean
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          link_url: string | null
          network_logo_url: string | null
          show_phone: boolean
          show_tv: boolean
          show_web: boolean
          sort_order: number
          source_id: string | null
          source_kind: string | null
          subtitle: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          active?: boolean
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          link_url?: string | null
          network_logo_url?: string | null
          show_phone?: boolean
          show_tv?: boolean
          show_web?: boolean
          sort_order?: number
          source_id?: string | null
          source_kind?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          active?: boolean
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          link_url?: string | null
          network_logo_url?: string | null
          show_phone?: boolean
          show_tv?: boolean
          show_web?: boolean
          sort_order?: number
          source_id?: string | null
          source_kind?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      homepage_clicks: {
        Row: {
          created_at: string | null
          destination: string
          id: string
          referrer: string | null
          section: string
          session_id: string | null
          tier: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          destination: string
          id?: string
          referrer?: string | null
          section: string
          session_id?: string | null
          tier?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          destination?: string
          id?: string
          referrer?: string | null
          section?: string
          session_id?: string | null
          tier?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      in_app_notifications: {
        Row: {
          body: string | null
          created_at: string
          data: Json | null
          id: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      legacy_audit: {
        Row: {
          action: string
          created_at: string
          id: string
          notes: string | null
          performed_by: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          notes?: string | null
          performed_by?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          notes?: string | null
          performed_by?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      library_series_subscriptions: {
        Row: {
          notify_new: boolean
          series_id: string
          subscribed_at: string
          user_id: string
        }
        Insert: {
          notify_new?: boolean
          series_id: string
          subscribed_at?: string
          user_id: string
        }
        Update: {
          notify_new?: boolean
          series_id?: string
          subscribed_at?: string
          user_id?: string
        }
        Relationships: []
      }
      library_watchlist: {
        Row: {
          added_at: string
          source: string
          user_id: string
          video_id: string
          video_thumbnail: string | null
          video_title: string | null
        }
        Insert: {
          added_at?: string
          source?: string
          user_id: string
          video_id: string
          video_thumbnail?: string | null
          video_title?: string | null
        }
        Update: {
          added_at?: string
          source?: string
          user_id?: string
          video_id?: string
          video_thumbnail?: string | null
          video_title?: string | null
        }
        Relationships: []
      }
      media_sections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
          vimeo_folder_id: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
          vimeo_folder_id: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
          vimeo_folder_id?: string
          visible?: boolean
        }
        Relationships: []
      }
      meditations: {
        Row: {
          audio_url: string
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          is_published: boolean
          sort_order: number
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          audio_url: string
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_published?: boolean
          sort_order?: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          audio_url?: string
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_published?: boolean
          sort_order?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      member_notes: {
        Row: {
          author_id: string | null
          created_at: string | null
          id: string
          member_id: string | null
          note: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          id?: string
          member_id?: string | null
          note: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          id?: string
          member_id?: string | null
          note?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_notes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_notes_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_promo_codes: {
        Row: {
          active: boolean | null
          applicable_tiers: string[] | null
          code: string
          created_at: string | null
          discount_type: string | null
          discount_value: number | null
          ends_at: string | null
          id: string
          max_uses: number | null
          notes: string | null
          promo_type: string
          starts_at: string | null
          trial_days: number | null
          used_count: number | null
        }
        Insert: {
          active?: boolean | null
          applicable_tiers?: string[] | null
          code: string
          created_at?: string | null
          discount_type?: string | null
          discount_value?: number | null
          ends_at?: string | null
          id?: string
          max_uses?: number | null
          notes?: string | null
          promo_type: string
          starts_at?: string | null
          trial_days?: number | null
          used_count?: number | null
        }
        Update: {
          active?: boolean | null
          applicable_tiers?: string[] | null
          code?: string
          created_at?: string | null
          discount_type?: string | null
          discount_value?: number | null
          ends_at?: string | null
          id?: string
          max_uses?: number | null
          notes?: string | null
          promo_type?: string
          starts_at?: string | null
          trial_days?: number | null
          used_count?: number | null
        }
        Relationships: []
      }
      memberships: {
        Row: {
          access_type: string
          admin_note: string | null
          admin_override: boolean
          created_at: string
          crypto_credit_days: number
          crypto_expires_at: string | null
          current_period_end: string | null
          ends_at: string | null
          id: string
          is_legacy: boolean
          is_paused: boolean
          legacy_grandfather_lost_at: string | null
          paused_at: string | null
          payment_method: string | null
          plan_name: string | null
          started_at: string | null
          status: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_type?: string
          admin_note?: string | null
          admin_override?: boolean
          created_at?: string
          crypto_credit_days?: number
          crypto_expires_at?: string | null
          current_period_end?: string | null
          ends_at?: string | null
          id?: string
          is_legacy?: boolean
          is_paused?: boolean
          legacy_grandfather_lost_at?: string | null
          paused_at?: string | null
          payment_method?: string | null
          plan_name?: string | null
          started_at?: string | null
          status: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_type?: string
          admin_note?: string | null
          admin_override?: boolean
          created_at?: string
          crypto_credit_days?: number
          crypto_expires_at?: string | null
          current_period_end?: string | null
          ends_at?: string | null
          id?: string
          is_legacy?: boolean
          is_paused?: boolean
          legacy_grandfather_lost_at?: string | null
          paused_at?: string | null
          payment_method?: string | null
          plan_name?: string | null
          started_at?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_conversation_participants: {
        Row: {
          archived_at: string | null
          conversation_id: string
          created_at: string
          id: string
          last_read_at: string | null
          muted_at: string | null
          unread_count: number
          user_id: string
        }
        Insert: {
          archived_at?: string | null
          conversation_id: string
          created_at?: string
          id?: string
          last_read_at?: string | null
          muted_at?: string | null
          unread_count?: number
          user_id: string
        }
        Update: {
          archived_at?: string | null
          conversation_id?: string
          created_at?: string
          id?: string
          last_read_at?: string | null
          muted_at?: string | null
          unread_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "message_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      message_conversations: {
        Row: {
          created_at: string
          created_by: string | null
          direct_key: string
          id: string
          last_message_at: string | null
          status: Database["public"]["Enums"]["message_conversation_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          direct_key: string
          id?: string
          last_message_at?: string | null
          status?: Database["public"]["Enums"]["message_conversation_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          direct_key?: string
          id?: string
          last_message_at?: string | null
          status?: Database["public"]["Enums"]["message_conversation_status"]
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          audio_duration_ms: number | null
          audio_url: string | null
          body: string
          conversation_id: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          message_type: string
          sender_id: string
        }
        Insert: {
          audio_duration_ms?: number | null
          audio_url?: string | null
          body: string
          conversation_id: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          message_type?: string
          sender_id: string
        }
        Update: {
          audio_duration_ms?: number | null
          audio_url?: string | null
          body?: string
          conversation_id?: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          message_type?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "message_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      native_push_tokens: {
        Row: {
          created_at: string
          id: string
          platform: string
          token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform: string
          token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string
          token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          email_community_announcements: boolean | null
          email_event_reminders: boolean | null
          email_event_upcoming_1h: boolean
          email_event_upcoming_24h: boolean
          email_governance_membership: boolean
          email_governance_proposals: boolean
          email_live_starting: boolean
          email_marketing_subscribed: boolean
          email_membership_updates: boolean | null
          email_new_events: boolean | null
          email_proposal_status: boolean
          email_series_episode: boolean
          id: string
          mailchimp_member_id: string | null
          mailchimp_subscribed: boolean | null
          push_event_reminders: boolean | null
          push_event_upcoming_1h: boolean
          push_event_upcoming_24h: boolean
          push_governance_membership: boolean
          push_governance_proposals: boolean
          push_live_starting: boolean
          push_livestream_alerts: boolean | null
          push_new_events: boolean | null
          push_proposal_status: boolean
          push_series_episode: boolean
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          email_community_announcements?: boolean | null
          email_event_reminders?: boolean | null
          email_event_upcoming_1h?: boolean
          email_event_upcoming_24h?: boolean
          email_governance_membership?: boolean
          email_governance_proposals?: boolean
          email_live_starting?: boolean
          email_marketing_subscribed?: boolean
          email_membership_updates?: boolean | null
          email_new_events?: boolean | null
          email_proposal_status?: boolean
          email_series_episode?: boolean
          id?: string
          mailchimp_member_id?: string | null
          mailchimp_subscribed?: boolean | null
          push_event_reminders?: boolean | null
          push_event_upcoming_1h?: boolean
          push_event_upcoming_24h?: boolean
          push_governance_membership?: boolean
          push_governance_proposals?: boolean
          push_live_starting?: boolean
          push_livestream_alerts?: boolean | null
          push_new_events?: boolean | null
          push_proposal_status?: boolean
          push_series_episode?: boolean
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          email_community_announcements?: boolean | null
          email_event_reminders?: boolean | null
          email_event_upcoming_1h?: boolean
          email_event_upcoming_24h?: boolean
          email_governance_membership?: boolean
          email_governance_proposals?: boolean
          email_live_starting?: boolean
          email_marketing_subscribed?: boolean
          email_membership_updates?: boolean | null
          email_new_events?: boolean | null
          email_proposal_status?: boolean
          email_series_episode?: boolean
          id?: string
          mailchimp_member_id?: string | null
          mailchimp_subscribed?: boolean | null
          push_event_reminders?: boolean | null
          push_event_upcoming_1h?: boolean
          push_event_upcoming_24h?: boolean
          push_governance_membership?: boolean
          push_governance_proposals?: boolean
          push_live_starting?: boolean
          push_livestream_alerts?: boolean | null
          push_new_events?: boolean | null
          push_proposal_status?: boolean
          push_series_episode?: boolean
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          email_attempt_count: number
          email_error: string | null
          email_sent_at: string | null
          href: string | null
          id: string
          metadata: Json | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          email_attempt_count?: number
          email_error?: string | null
          email_sent_at?: string | null
          href?: string | null
          id?: string
          metadata?: Json | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          email_attempt_count?: number
          email_error?: string | null
          email_sent_at?: string | null
          href?: string | null
          id?: string
          metadata?: Json | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      pending_signups: {
        Row: {
          affiliate_code: string | null
          attempts: number
          birthdate: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          otp_channel: string
          otp_code: string
          otp_expires_at: string
          password_encrypted: string
          password_iv: string
          payment_type: string | null
          phone: string | null
          promo_code: string | null
          region: string | null
          terms_accepted_at: string | null
          terms_version: string | null
          tier: string
        }
        Insert: {
          affiliate_code?: string | null
          attempts?: number
          birthdate?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          otp_channel?: string
          otp_code: string
          otp_expires_at: string
          password_encrypted: string
          password_iv: string
          payment_type?: string | null
          phone?: string | null
          promo_code?: string | null
          region?: string | null
          terms_accepted_at?: string | null
          terms_version?: string | null
          tier: string
        }
        Update: {
          affiliate_code?: string | null
          attempts?: number
          birthdate?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          otp_channel?: string
          otp_code?: string
          otp_expires_at?: string
          password_encrypted?: string
          password_iv?: string
          payment_type?: string | null
          phone?: string | null
          promo_code?: string | null
          region?: string | null
          terms_accepted_at?: string | null
          terms_version?: string | null
          tier?: string
        }
        Relationships: []
      }
      privacy_preferences: {
        Row: {
          analytics: boolean | null
          id: string
          marketing_communications: boolean | null
          personalised_recommendations: boolean | null
          profile_visibility: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analytics?: boolean | null
          id?: string
          marketing_communications?: boolean | null
          personalised_recommendations?: boolean | null
          profile_visibility?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analytics?: boolean | null
          id?: string
          marketing_communications?: boolean | null
          personalised_recommendations?: boolean | null
          profile_visibility?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "privacy_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string
          account_status_reason: string | null
          account_status_updated_at: string | null
          affiliate_program_visible: boolean
          archive_reason: string | null
          archived_at: string | null
          avatar_url: string | null
          banned_at: string | null
          banner_url: string | null
          bio: string | null
          birthdate: string | null
          chat_blocked_reason: string | null
          chat_status: string | null
          chat_timeout_until: string | null
          city_state: string | null
          country: string | null
          created_at: string
          display_name: string | null
          email: string | null
          facebook_url: string | null
          first_name: string | null
          full_name: string | null
          id: string
          instagram_url: string | null
          interests: string[] | null
          last_name: string | null
          local_status: string | null
          messaging_privacy: string
          password_reset_required: boolean
          password_reset_required_at: string | null
          phone: string | null
          phone_verified: boolean | null
          referral_source: string | null
          role: string | null
          suspended_until: string | null
          terms_accepted_at: string | null
          terms_version: string | null
          tiktok_url: string | null
          updated_at: string
          username: string | null
          website_url: string | null
          x_url: string | null
          youtube_url: string | null
        }
        Insert: {
          account_status?: string
          account_status_reason?: string | null
          account_status_updated_at?: string | null
          affiliate_program_visible?: boolean
          archive_reason?: string | null
          archived_at?: string | null
          avatar_url?: string | null
          banned_at?: string | null
          banner_url?: string | null
          bio?: string | null
          birthdate?: string | null
          chat_blocked_reason?: string | null
          chat_status?: string | null
          chat_timeout_until?: string | null
          city_state?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          facebook_url?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          instagram_url?: string | null
          interests?: string[] | null
          last_name?: string | null
          local_status?: string | null
          messaging_privacy?: string
          password_reset_required?: boolean
          password_reset_required_at?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          referral_source?: string | null
          role?: string | null
          suspended_until?: string | null
          terms_accepted_at?: string | null
          terms_version?: string | null
          tiktok_url?: string | null
          updated_at?: string
          username?: string | null
          website_url?: string | null
          x_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          account_status?: string
          account_status_reason?: string | null
          account_status_updated_at?: string | null
          affiliate_program_visible?: boolean
          archive_reason?: string | null
          archived_at?: string | null
          avatar_url?: string | null
          banned_at?: string | null
          banner_url?: string | null
          bio?: string | null
          birthdate?: string | null
          chat_blocked_reason?: string | null
          chat_status?: string | null
          chat_timeout_until?: string | null
          city_state?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          facebook_url?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          instagram_url?: string | null
          interests?: string[] | null
          last_name?: string | null
          local_status?: string | null
          messaging_privacy?: string
          password_reset_required?: boolean
          password_reset_required_at?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          referral_source?: string | null
          role?: string | null
          suspended_until?: string | null
          terms_accepted_at?: string | null
          terms_version?: string | null
          tiktok_url?: string | null
          updated_at?: string
          username?: string | null
          website_url?: string | null
          x_url?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      promo_code_usage: {
        Row: {
          applied_at: string | null
          code: string
          code_type: string
          discount_applied: number | null
          email: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          applied_at?: string | null
          code: string
          code_type: string
          discount_applied?: number | null
          email?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          applied_at?: string | null
          code?: string
          code_type?: string
          discount_applied?: number | null
          email?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          active: boolean
          applies_to: string
          code: string
          created_at: string
          created_by: string | null
          discount_type: string
          discount_value: number
          duration: string
          duration_in_months: number | null
          ends_at: string
          id: string
          max_redemptions: number | null
          starts_at: string
          stripe_coupon_id: string | null
          stripe_promotion_code_id: string | null
          times_redeemed: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          applies_to?: string
          code: string
          created_at?: string
          created_by?: string | null
          discount_type: string
          discount_value: number
          duration?: string
          duration_in_months?: number | null
          ends_at: string
          id?: string
          max_redemptions?: number | null
          starts_at?: string
          stripe_coupon_id?: string | null
          stripe_promotion_code_id?: string | null
          times_redeemed?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          applies_to?: string
          code?: string
          created_at?: string
          created_by?: string | null
          discount_type?: string
          discount_value?: number
          duration?: string
          duration_in_months?: number | null
          ends_at?: string
          id?: string
          max_redemptions?: number | null
          starts_at?: string
          stripe_coupon_id?: string | null
          stripe_promotion_code_id?: string | null
          times_redeemed?: number
          updated_at?: string
        }
        Relationships: []
      }
      proposal_attachments: {
        Row: {
          filename: string
          id: string
          mime_type: string
          proposal_id: string
          size_bytes: number
          storage_path: string
          uploaded_at: string
          uploaded_by: string | null
        }
        Insert: {
          filename: string
          id?: string
          mime_type: string
          proposal_id: string
          size_bytes: number
          storage_path: string
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Update: {
          filename?: string
          id?: string
          mime_type?: string
          proposal_id?: string
          size_bytes?: number
          storage_path?: string
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposal_attachments_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "governance_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_comment_moderation_log: {
        Row: {
          action: string
          actor_id: string
          body_snapshot: string | null
          comment_id: string
          created_at: string
          id: string
          reason: string | null
        }
        Insert: {
          action: string
          actor_id: string
          body_snapshot?: string | null
          comment_id: string
          created_at?: string
          id?: string
          reason?: string | null
        }
        Update: {
          action?: string
          actor_id?: string
          body_snapshot?: string | null
          comment_id?: string
          created_at?: string
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposal_comment_moderation_log_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "proposal_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_comments: {
        Row: {
          admin_removed_at: string | null
          admin_removed_by: string | null
          admin_removed_reason: string | null
          body: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          parent_id: string | null
          proposal_id: string
          user_id: string
        }
        Insert: {
          admin_removed_at?: string | null
          admin_removed_by?: string | null
          admin_removed_reason?: string | null
          body: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          parent_id?: string | null
          proposal_id: string
          user_id: string
        }
        Update: {
          admin_removed_at?: string | null
          admin_removed_by?: string | null
          admin_removed_reason?: string | null
          body?: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          parent_id?: string | null
          proposal_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "proposal_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_comments_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "governance_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_submissions: {
        Row: {
          admin_notes: string | null
          admin_reviewed_at: string | null
          admin_reviewed_by: string | null
          auto_delete_at: string | null
          body: string
          cancelled_at: string | null
          created_at: string
          department_id: string | null
          dept_notes: string | null
          dept_reviewed_at: string | null
          dept_reviewed_by: string | null
          id: string
          rejection_reason: string | null
          revised_body: string | null
          revised_title: string | null
          revision_count: number
          status: string
          submitted_by: string | null
          title: string
          updated_at: string
          voting_proposal_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          admin_reviewed_at?: string | null
          admin_reviewed_by?: string | null
          auto_delete_at?: string | null
          body: string
          cancelled_at?: string | null
          created_at?: string
          department_id?: string | null
          dept_notes?: string | null
          dept_reviewed_at?: string | null
          dept_reviewed_by?: string | null
          id?: string
          rejection_reason?: string | null
          revised_body?: string | null
          revised_title?: string | null
          revision_count?: number
          status?: string
          submitted_by?: string | null
          title: string
          updated_at?: string
          voting_proposal_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          admin_reviewed_at?: string | null
          admin_reviewed_by?: string | null
          auto_delete_at?: string | null
          body?: string
          cancelled_at?: string | null
          created_at?: string
          department_id?: string | null
          dept_notes?: string | null
          dept_reviewed_at?: string | null
          dept_reviewed_by?: string | null
          id?: string
          rejection_reason?: string | null
          revised_body?: string | null
          revised_title?: string | null
          revision_count?: number
          status?: string
          submitted_by?: string | null
          title?: string
          updated_at?: string
          voting_proposal_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposal_submissions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_submissions_voting_proposal_id_fkey"
            columns: ["voting_proposal_id"]
            isOneToOne: true
            referencedRelation: "governance_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      published_replays: {
        Row: {
          access: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          published_at: string | null
          recently_added_until: string | null
          sort_order: number | null
          thumbnail: string | null
          title: string
          video_id: string
          vimeo_link: string | null
        }
        Insert: {
          access?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          published_at?: string | null
          recently_added_until?: string | null
          sort_order?: number | null
          thumbnail?: string | null
          title?: string
          video_id: string
          vimeo_link?: string | null
        }
        Update: {
          access?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          published_at?: string | null
          recently_added_until?: string | null
          sort_order?: number | null
          thumbnail?: string | null
          title?: string
          video_id?: string
          vimeo_link?: string | null
        }
        Relationships: []
      }
      published_section_videos: {
        Row: {
          access: string
          description: string | null
          duration: number
          id: string
          published_at: string
          recently_added_until: string | null
          section_slug: string
          sort_order: number
          thumbnail: string | null
          title: string
          updated_at: string
          video_id: string
          vimeo_link: string | null
        }
        Insert: {
          access?: string
          description?: string | null
          duration?: number
          id?: string
          published_at?: string
          recently_added_until?: string | null
          section_slug: string
          sort_order?: number
          thumbnail?: string | null
          title: string
          updated_at?: string
          video_id: string
          vimeo_link?: string | null
        }
        Update: {
          access?: string
          description?: string | null
          duration?: number
          id?: string
          published_at?: string
          recently_added_until?: string | null
          section_slug?: string
          sort_order?: number
          thumbnail?: string | null
          title?: string
          updated_at?: string
          video_id?: string
          vimeo_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "published_section_videos_section_slug_fkey"
            columns: ["section_slug"]
            isOneToOne: false
            referencedRelation: "media_sections"
            referencedColumns: ["slug"]
          },
        ]
      }
      pulse: {
        Row: {
          actor_id: string | null
          body: string | null
          created_at: string | null
          id: string
          link: string | null
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          body?: string | null
          created_at?: string | null
          id?: string
          link?: string | null
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          actor_id?: string | null
          body?: string | null
          created_at?: string | null
          id?: string
          link?: string | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          subscription: Json
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          subscription: Json
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          subscription?: Json
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_codes: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          metadata: Json
          qr_type: string
          registration_id: string | null
          scanned_at: string | null
          status: string
          token: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id?: string
          metadata?: Json
          qr_type: string
          registration_id?: string | null
          scanned_at?: string | null
          status?: string
          token: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          metadata?: Json
          qr_type?: string
          registration_id?: string | null
          scanned_at?: string | null
          status?: string
          token?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_codes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_codes_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "event_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      registration_attempts: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          email: string
          expired_at: string | null
          id: string
          notes: string | null
          status: string
          tier_selected: string | null
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          email: string
          expired_at?: string | null
          id?: string
          notes?: string | null
          status?: string
          tier_selected?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          email?: string
          expired_at?: string | null
          id?: string
          notes?: string | null
          status?: string
          tier_selected?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      reserved_usernames: {
        Row: {
          reason: string | null
          username: string
        }
        Insert: {
          reason?: string | null
          username: string
        }
        Update: {
          reason?: string | null
          username?: string
        }
        Relationships: []
      }
      series_config: {
        Row: {
          access: string | null
          created_at: string | null
          description: string | null
          folder_id: string
          published: boolean | null
          recently_added_until: string | null
          sort_order: number | null
          thumbnail: string | null
          title: string | null
          updated_at: string | null
          video_order: string[] | null
        }
        Insert: {
          access?: string | null
          created_at?: string | null
          description?: string | null
          folder_id: string
          published?: boolean | null
          recently_added_until?: string | null
          sort_order?: number | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
          video_order?: string[] | null
        }
        Update: {
          access?: string | null
          created_at?: string | null
          description?: string | null
          folder_id?: string
          published?: boolean | null
          recently_added_until?: string | null
          sort_order?: number | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
          video_order?: string[] | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      stay_blocked_dates: {
        Row: {
          created_at: string
          end_date: string
          id: string
          note: string | null
          property_id: string
          source: string
          start_date: string
          unit_id: string | null
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          note?: string | null
          property_id: string
          source?: string
          start_date: string
          unit_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          note?: string | null
          property_id?: string
          source?: string
          start_date?: string
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stay_blocked_dates_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "stay_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stay_blocked_dates_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "stay_units"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_booking_units: {
        Row: {
          booking_id: string
          unit_id: string
        }
        Insert: {
          booking_id: string
          unit_id: string
        }
        Update: {
          booking_id?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stay_booking_units_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "stay_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stay_booking_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "stay_units"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_bookings: {
        Row: {
          addons: Json
          cancellation_policy: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          check_in: string
          check_out: string
          checkin_reminded_at: string | null
          cleaning_fee_cents: number
          created_at: string
          event_id: string | null
          event_tickets: Json
          guest_user_id: string
          guests: number
          host_payout_cents: number | null
          id: string
          nightly_cents: number
          nights: number
          package_id: string | null
          paid_out_at: string | null
          price_tier: string
          property_id: string
          refund_cents: number | null
          request_expires_at: string | null
          service_fee_cents: number
          status: string
          stripe_payment_intent_id: string | null
          stripe_transfer_id: string | null
          subtotal_cents: number
          tickets_issued: boolean
          total_cents: number
          unit_id: string | null
        }
        Insert: {
          addons?: Json
          cancellation_policy?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          check_in: string
          check_out: string
          checkin_reminded_at?: string | null
          cleaning_fee_cents?: number
          created_at?: string
          event_id?: string | null
          event_tickets?: Json
          guest_user_id: string
          guests?: number
          host_payout_cents?: number | null
          id?: string
          nightly_cents: number
          nights: number
          package_id?: string | null
          paid_out_at?: string | null
          price_tier?: string
          property_id: string
          refund_cents?: number | null
          request_expires_at?: string | null
          service_fee_cents?: number
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
          subtotal_cents: number
          tickets_issued?: boolean
          total_cents: number
          unit_id?: string | null
        }
        Update: {
          addons?: Json
          cancellation_policy?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          check_in?: string
          check_out?: string
          checkin_reminded_at?: string | null
          cleaning_fee_cents?: number
          created_at?: string
          event_id?: string | null
          event_tickets?: Json
          guest_user_id?: string
          guests?: number
          host_payout_cents?: number | null
          id?: string
          nightly_cents?: number
          nights?: number
          package_id?: string | null
          paid_out_at?: string | null
          price_tier?: string
          property_id?: string
          refund_cents?: number | null
          request_expires_at?: string | null
          service_fee_cents?: number
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
          subtotal_cents?: number
          tickets_issued?: boolean
          total_cents?: number
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stay_bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "stay_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stay_bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "stay_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stay_bookings_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "stay_units"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_calendar_links: {
        Row: {
          created_at: string
          event_count: number
          ics_url: string
          id: string
          label: string
          last_status: string | null
          last_synced_at: string | null
          property_id: string
          unit_id: string | null
        }
        Insert: {
          created_at?: string
          event_count?: number
          ics_url: string
          id?: string
          label?: string
          last_status?: string | null
          last_synced_at?: string | null
          property_id: string
          unit_id?: string | null
        }
        Update: {
          created_at?: string
          event_count?: number
          ics_url?: string
          id?: string
          label?: string
          last_status?: string | null
          last_synced_at?: string | null
          property_id?: string
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stay_calendar_links_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "stay_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stay_calendar_links_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "stay_units"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_channel_calendars: {
        Row: {
          created_at: string
          ical_import_url: string | null
          id: string
          label: string
          last_synced_at: string | null
          property_id: string
        }
        Insert: {
          created_at?: string
          ical_import_url?: string | null
          id?: string
          label: string
          last_synced_at?: string | null
          property_id: string
        }
        Update: {
          created_at?: string
          ical_import_url?: string | null
          id?: string
          label?: string
          last_synced_at?: string | null
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stay_channel_calendars_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "stay_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_experiences: {
        Row: {
          created_at: string
          description: string | null
          id: string
          included: boolean
          price_cents: number
          property_id: string
          schedule_note: string | null
          sort_order: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          included?: boolean
          price_cents?: number
          property_id: string
          schedule_note?: string | null
          sort_order?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          included?: boolean
          price_cents?: number
          property_id?: string
          schedule_note?: string | null
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "stay_experiences_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "stay_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_host_applications: {
        Row: {
          admin_notes: string | null
          airbnb_url: string | null
          approved_region: string | null
          bathrooms: number | null
          bedrooms: number | null
          booking_url: string | null
          business_name: string | null
          city: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          latitude: number | null
          location_verified: boolean
          longitude: number | null
          number_of_properties: number | null
          other_url: string | null
          phone: string | null
          property_management_software: string | null
          property_type: string | null
          property_type_other: string | null
          review: Json
          reviewed_at: string | null
          sleeps: number | null
          state: string | null
          status: string
          street_address: string | null
          unit_number: string | null
          updated_at: string
          user_id: string | null
          vrbo_url: string | null
          website_url: string | null
          zip_code: string | null
        }
        Insert: {
          admin_notes?: string | null
          airbnb_url?: string | null
          approved_region?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          booking_url?: string | null
          business_name?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          latitude?: number | null
          location_verified?: boolean
          longitude?: number | null
          number_of_properties?: number | null
          other_url?: string | null
          phone?: string | null
          property_management_software?: string | null
          property_type?: string | null
          property_type_other?: string | null
          review?: Json
          reviewed_at?: string | null
          sleeps?: number | null
          state?: string | null
          status?: string
          street_address?: string | null
          unit_number?: string | null
          updated_at?: string
          user_id?: string | null
          vrbo_url?: string | null
          website_url?: string | null
          zip_code?: string | null
        }
        Update: {
          admin_notes?: string | null
          airbnb_url?: string | null
          approved_region?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          booking_url?: string | null
          business_name?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          latitude?: number | null
          location_verified?: boolean
          longitude?: number | null
          number_of_properties?: number | null
          other_url?: string | null
          phone?: string | null
          property_management_software?: string | null
          property_type?: string | null
          property_type_other?: string | null
          review?: Json
          reviewed_at?: string | null
          sleeps?: number | null
          state?: string | null
          status?: string
          street_address?: string | null
          unit_number?: string | null
          updated_at?: string
          user_id?: string | null
          vrbo_url?: string | null
          website_url?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      stay_host_members: {
        Row: {
          accepted_at: string | null
          created_at: string
          host_id: string
          id: string
          invited_by: string | null
          role: string
          status: string
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          host_id: string
          id?: string
          invited_by?: string | null
          role: string
          status?: string
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          host_id?: string
          id?: string
          invited_by?: string | null
          role?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      stay_host_waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      stay_hosts: {
        Row: {
          avatar_url: string | null
          bio: string | null
          charges_enabled: boolean
          created_at: string
          display_name: string
          id: string
          payout_email: string | null
          payouts_enabled: boolean
          pending_transfer_at: string | null
          pending_transfer_to: string | null
          status: string
          stripe_account_id: string | null
          transfer_status: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          charges_enabled?: boolean
          created_at?: string
          display_name: string
          id?: string
          payout_email?: string | null
          payouts_enabled?: boolean
          pending_transfer_at?: string | null
          pending_transfer_to?: string | null
          status?: string
          stripe_account_id?: string | null
          transfer_status?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          charges_enabled?: boolean
          created_at?: string
          display_name?: string
          id?: string
          payout_email?: string | null
          payouts_enabled?: boolean
          pending_transfer_at?: string | null
          pending_transfer_to?: string | null
          status?: string
          stripe_account_id?: string | null
          transfer_status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stay_package_units: {
        Row: {
          package_id: string
          unit_id: string
        }
        Insert: {
          package_id: string
          unit_id: string
        }
        Update: {
          package_id?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stay_package_units_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "stay_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stay_package_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "stay_units"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_packages: {
        Row: {
          base_price_cents: number
          cleaning_fee_cents: number
          created_at: string
          description: string | null
          id: string
          member_price_cents: number | null
          min_nights: number
          name: string
          photos: Json
          property_id: string
          sort_order: number
        }
        Insert: {
          base_price_cents?: number
          cleaning_fee_cents?: number
          created_at?: string
          description?: string | null
          id?: string
          member_price_cents?: number | null
          min_nights?: number
          name: string
          photos?: Json
          property_id: string
          sort_order?: number
        }
        Update: {
          base_price_cents?: number
          cleaning_fee_cents?: number
          created_at?: string
          description?: string | null
          id?: string
          member_price_cents?: number | null
          min_nights?: number
          name?: string
          photos?: Json
          property_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "stay_packages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "stay_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_properties: {
        Row: {
          address: string | null
          allow_children: boolean
          allow_infants: boolean
          allow_pets: boolean
          amenities: Json
          base_price_cents: number
          baths: number
          bedrooms: number
          beds: number
          booking_mode: string
          cancellation_policy: string
          city: string
          cleaning_fee_cents: number
          created_at: string
          description: string | null
          host_id: string
          ical_token: string | null
          id: string
          lat: number | null
          lng: number | null
          max_guests: number
          member_price_cents: number | null
          min_nights: number
          photos: Json
          rating_avg: number | null
          rating_count: number
          slug: string
          state: string
          status: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          allow_children?: boolean
          allow_infants?: boolean
          allow_pets?: boolean
          amenities?: Json
          base_price_cents?: number
          baths?: number
          bedrooms?: number
          beds?: number
          booking_mode?: string
          cancellation_policy?: string
          city?: string
          cleaning_fee_cents?: number
          created_at?: string
          description?: string | null
          host_id: string
          ical_token?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          max_guests?: number
          member_price_cents?: number | null
          min_nights?: number
          photos?: Json
          rating_avg?: number | null
          rating_count?: number
          slug: string
          state?: string
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          allow_children?: boolean
          allow_infants?: boolean
          allow_pets?: boolean
          amenities?: Json
          base_price_cents?: number
          baths?: number
          bedrooms?: number
          beds?: number
          booking_mode?: string
          cancellation_policy?: string
          city?: string
          cleaning_fee_cents?: number
          created_at?: string
          description?: string | null
          host_id?: string
          ical_token?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          max_guests?: number
          member_price_cents?: number | null
          min_nights?: number
          photos?: Json
          rating_avg?: number | null
          rating_count?: number
          slug?: string
          state?: string
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stay_properties_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "stay_hosts"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          guest_user_id: string
          id: string
          property_id: string
          rating: number
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          guest_user_id: string
          id?: string
          property_id: string
          rating: number
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          guest_user_id?: string
          id?: string
          property_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "stay_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "stay_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stay_reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "stay_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      stay_units: {
        Row: {
          base_price_cents: number
          bath_type: string | null
          bed_config: string | null
          cleaning_fee_cents: number
          created_at: string
          description: string | null
          ical_token: string | null
          id: string
          member_price_cents: number | null
          min_nights: number
          name: string
          photos: Json
          property_id: string
          sleeps: number
          sort_order: number
        }
        Insert: {
          base_price_cents?: number
          bath_type?: string | null
          bed_config?: string | null
          cleaning_fee_cents?: number
          created_at?: string
          description?: string | null
          ical_token?: string | null
          id?: string
          member_price_cents?: number | null
          min_nights?: number
          name: string
          photos?: Json
          property_id: string
          sleeps?: number
          sort_order?: number
        }
        Update: {
          base_price_cents?: number
          bath_type?: string | null
          bed_config?: string | null
          cleaning_fee_cents?: number
          created_at?: string
          description?: string | null
          ical_token?: string | null
          id?: string
          member_price_cents?: number | null
          min_nights?: number
          name?: string
          photos?: Json
          property_id?: string
          sleeps?: number
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "stay_units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "stay_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_notifications: {
        Row: {
          aired_at: string | null
          created_at: string
          email: string
          id: string
          moved_to_watchlist: boolean
          series_slug: string | null
          stream_id: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          aired_at?: string | null
          created_at?: string
          email: string
          id?: string
          moved_to_watchlist?: boolean
          series_slug?: string | null
          stream_id: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          aired_at?: string | null
          created_at?: string
          email?: string
          id?: string
          moved_to_watchlist?: boolean
          series_slug?: string | null
          stream_id?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      stream_series: {
        Row: {
          access: string | null
          created_at: string | null
          name: string | null
          recurring_day: string | null
          recurring_time: string | null
          recurring_tz: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          access?: string | null
          created_at?: string | null
          name?: string | null
          recurring_day?: string | null
          recurring_time?: string | null
          recurring_tz?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          access?: string | null
          created_at?: string | null
          name?: string | null
          recurring_day?: string | null
          recurring_time?: string | null
          recurring_tz?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tv_activation_claim_attempts: {
        Row: {
          code_hash: string | null
          created_at: string
          id: number
          ip_hash: string | null
          success: boolean
          user_id: string | null
        }
        Insert: {
          code_hash?: string | null
          created_at?: string
          id?: number
          ip_hash?: string | null
          success?: boolean
          user_id?: string | null
        }
        Update: {
          code_hash?: string | null
          created_at?: string
          id?: number
          ip_hash?: string | null
          success?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      tv_activation_codes: {
        Row: {
          attempt_count: number
          claimed_at: string | null
          code: string
          created_at: string
          device_token_hash: string
          expires_at: string
          id: string
          last_seen_at: string | null
          session_id: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          attempt_count?: number
          claimed_at?: string | null
          code: string
          created_at?: string
          device_token_hash: string
          expires_at?: string
          id?: string
          last_seen_at?: string | null
          session_id?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          attempt_count?: number
          claimed_at?: string | null
          code?: string
          created_at?: string
          device_token_hash?: string
          expires_at?: string
          id?: string
          last_seen_at?: string | null
          session_id?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tv_activation_codes_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "tv_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      tv_activation_start_attempts: {
        Row: {
          created_at: string
          id: number
          ip_hash: string | null
          user_agent_hash: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          ip_hash?: string | null
          user_agent_hash?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          ip_hash?: string | null
          user_agent_hash?: string | null
        }
        Relationships: []
      }
      tv_sessions: {
        Row: {
          activated_at: string | null
          created_at: string
          device_key_hash: string | null
          device_label: string | null
          expires_at: string
          id: string
          last_seen_at: string | null
          platform: string
          revoked_at: string | null
          scope: string[]
          status: string
          token_hash: string
          user_id: string | null
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          device_key_hash?: string | null
          device_label?: string | null
          expires_at: string
          id?: string
          last_seen_at?: string | null
          platform?: string
          revoked_at?: string | null
          scope?: string[]
          status?: string
          token_hash: string
          user_id?: string | null
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          device_key_hash?: string | null
          device_label?: string | null
          expires_at?: string
          id?: string
          last_seen_at?: string | null
          platform?: string
          revoked_at?: string | null
          scope?: string[]
          status?: string
          token_hash?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
          id: string
          reason: string | null
          source: string | null
          updated_at: string
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
          id?: string
          reason?: string | null
          source?: string | null
          updated_at?: string
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
          id?: string
          reason?: string | null
          source?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string
          followed_id: string
          follower_id: string
          id: string
        }
        Insert: {
          created_at?: string
          followed_id: string
          follower_id: string
          id?: string
        }
        Update: {
          created_at?: string
          followed_id?: string
          follower_id?: string
          id?: string
        }
        Relationships: []
      }
      user_identity_keys: {
        Row: {
          account_id: string | null
          created_at: string
          encrypted_private_key: string | null
          encryption_nonce: string | null
          encryption_version: number
          id: string
          is_active: boolean
          kdf_iterations: number | null
          kdf_salt: string | null
          key_type: string
          network: string | null
          public_key: string | null
          updated_at: string
          upgraded_at: string | null
          user_id: string
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          encrypted_private_key?: string | null
          encryption_nonce?: string | null
          encryption_version?: number
          id?: string
          is_active?: boolean
          kdf_iterations?: number | null
          kdf_salt?: string | null
          key_type?: string
          network?: string | null
          public_key?: string | null
          updated_at?: string
          upgraded_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string | null
          created_at?: string
          encrypted_private_key?: string | null
          encryption_nonce?: string | null
          encryption_version?: number
          id?: string
          is_active?: boolean
          kdf_iterations?: number | null
          kdf_salt?: string | null
          key_type?: string
          network?: string | null
          public_key?: string | null
          updated_at?: string
          upgraded_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_payment_wallets: {
        Row: {
          chain: string
          connected_at: string
          updated_at: string
          user_id: string
          wallet_address: string
          wallet_type: string
        }
        Insert: {
          chain: string
          connected_at?: string
          updated_at?: string
          user_id: string
          wallet_address: string
          wallet_type: string
        }
        Update: {
          chain?: string
          connected_at?: string
          updated_at?: string
          user_id?: string
          wallet_address?: string
          wallet_type?: string
        }
        Relationships: []
      }
      user_profile_pinned_posts: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_pinned_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "department_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_verification_tiers: {
        Row: {
          tier: number
          tier_set_by: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          tier?: number
          tier_set_by?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          tier?: number
          tier_set_by?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_wallets: {
        Row: {
          connected_at: string
          id: string
          network: string
          provider: string
          updated_at: string
          user_id: string
          wallet_address: string
        }
        Insert: {
          connected_at?: string
          id?: string
          network?: string
          provider?: string
          updated_at?: string
          user_id: string
          wallet_address: string
        }
        Update: {
          connected_at?: string
          id?: string
          network?: string
          provider?: string
          updated_at?: string
          user_id?: string
          wallet_address?: string
        }
        Relationships: []
      }
      viewer_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          id: string
          is_default: boolean
          is_kid_profile: boolean
          max_age_rating: string | null
          parental_pin_hash: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name: string
          id?: string
          is_default?: boolean
          is_kid_profile?: boolean
          max_age_rating?: string | null
          parental_pin_hash?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_default?: boolean
          is_kid_profile?: boolean
          max_age_rating?: string | null
          parental_pin_hash?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vimeo_folder_access: {
        Row: {
          access: string
          folder_id: string
          updated_at: string | null
        }
        Insert: {
          access?: string
          folder_id: string
          updated_at?: string | null
        }
        Update: {
          access?: string
          folder_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      vimeo_live_status_cache: {
        Row: {
          checked_at: string
          expires_at: string
          status: string | null
          video_id: string
        }
        Insert: {
          checked_at?: string
          expires_at?: string
          status?: string | null
          video_id: string
        }
        Update: {
          checked_at?: string
          expires_at?: string
          status?: string | null
          video_id?: string
        }
        Relationships: []
      }
      vimeo_stream_config: {
        Row: {
          access: string | null
          description: string | null
          embed_url: string | null
          recurring: string | null
          required_tier: string
          scheduled_time: string | null
          series_name: string | null
          series_slug: string | null
          show_on_live_page: boolean | null
          sort_order: number | null
          thumbnail: string | null
          title: string | null
          updated_at: string | null
          video_id: string
          vimeo_folder_id: string | null
        }
        Insert: {
          access?: string | null
          description?: string | null
          embed_url?: string | null
          recurring?: string | null
          required_tier?: string
          scheduled_time?: string | null
          series_name?: string | null
          series_slug?: string | null
          show_on_live_page?: boolean | null
          sort_order?: number | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
          video_id: string
          vimeo_folder_id?: string | null
        }
        Update: {
          access?: string | null
          description?: string | null
          embed_url?: string | null
          recurring?: string | null
          required_tier?: string
          scheduled_time?: string | null
          series_name?: string | null
          series_slug?: string | null
          show_on_live_page?: boolean | null
          sort_order?: number | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
          video_id?: string
          vimeo_folder_id?: string | null
        }
        Relationships: []
      }
      vimeo_video_access: {
        Row: {
          access: string | null
          embed_url: string | null
          updated_at: string | null
          video_id: string
        }
        Insert: {
          access?: string | null
          embed_url?: string | null
          updated_at?: string | null
          video_id: string
        }
        Update: {
          access?: string | null
          embed_url?: string | null
          updated_at?: string | null
          video_id?: string
        }
        Relationships: []
      }
      vote_delegations: {
        Row: {
          created_at: string
          delegate_id: string
          delegator_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          delegate_id: string
          delegator_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          delegate_id?: string
          delegator_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      watch_progress: {
        Row: {
          completed: boolean
          duration_seconds: number | null
          last_watched_at: string
          position_seconds: number
          user_id: string
          video_id: string
          video_thumbnail: string | null
          video_title: string | null
        }
        Insert: {
          completed?: boolean
          duration_seconds?: number | null
          last_watched_at?: string
          position_seconds: number
          user_id: string
          video_id: string
          video_thumbnail?: string | null
          video_title?: string | null
        }
        Update: {
          completed?: boolean
          duration_seconds?: number | null
          last_watched_at?: string
          position_seconds?: number
          user_id?: string
          video_id?: string
          video_thumbnail?: string | null
          video_title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      analytics_broadcast_daily: {
        Row: {
          avg_viewers: number | null
          day: string | null
          minutes_with_viewers: number | null
          peak_viewers: number | null
        }
        Relationships: []
      }
      analytics_broadcast_live: {
        Row: {
          current_viewers: number | null
          last_seen: string | null
          live_mode_viewers: number | null
          logged_in_viewers: number | null
          playlist_mode_viewers: number | null
        }
        Relationships: []
      }
      analytics_broadcast_peaks: {
        Row: {
          day_of_week: number | null
          event_count: number | null
          hour_of_day: number | null
          unique_viewers: number | null
        }
        Relationships: []
      }
      analytics_commercial_stats: {
        Row: {
          commercial_id: string | null
          commercial_title: string | null
          last_shown_at: string | null
          total_impressions: number | null
          unique_viewer_anon: number | null
          unique_viewer_users: number | null
        }
        Relationships: []
      }
      analytics_media_conversions: {
        Row: {
          conversion_rate_pct: number | null
          converters_within_7d: number | null
          free_viewers: number | null
          video_id: string | null
        }
        Relationships: []
      }
      analytics_top_videos: {
        Row: {
          completion_rate: number | null
          content_type: string | null
          total_watch_seconds: number | null
          unique_viewers: number | null
          video_id: string | null
          video_title: string | null
          views_this_week: number | null
          watch_seconds_this_week: number | null
        }
        Relationships: []
      }
      analytics_user_history: {
        Row: {
          completion_pct: number | null
          content_type: string | null
          duration_watched_sec: number | null
          is_complete: boolean | null
          last_watched_at: string | null
          user_id: string | null
          video_id: string | null
          video_title: string | null
          view_count: number | null
        }
        Relationships: []
      }
      analytics_video_stats: {
        Row: {
          completed_sessions: number | null
          completion_rate: number | null
          content_type: string | null
          finished_sessions: number | null
          free_views: number | null
          last_viewed_at: string | null
          member_views: number | null
          total_views: number | null
          total_watch_seconds: number | null
          unique_anonymous: number | null
          unique_logged_in: number | null
          unique_viewers: number | null
          video_id: string | null
          video_title: string | null
        }
        Relationships: []
      }
      analytics_watch_heatmap: {
        Row: {
          day_of_week: number | null
          hour_of_day: number | null
          unique_viewers: number | null
          view_starts: number | null
        }
        Relationships: []
      }
      registration_attempt_stats: {
        Row: {
          count: number | null
          created_day: string | null
          status: string | null
          tier_selected: string | null
        }
        Relationships: []
      }
      user_follow_counts: {
        Row: {
          follower_count: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      analytics_broadcast_peaks_range: {
        Args: { date_from: string; date_to: string }
        Returns: {
          day_of_week: number
          event_count: number
          hour_of_day: number
          unique_viewers: number
        }[]
      }
      analytics_top_videos_range: {
        Args: { date_from: string; date_to: string; result_limit?: number }
        Returns: {
          content_type: string
          finishes_in_range: number
          unique_viewers_in_range: number
          video_id: string
          video_title: string
          views_in_range: number
          watch_seconds_in_range: number
        }[]
      }
      analytics_user_recent_views: {
        Args: { result_limit?: number; target_user_id: string }
        Returns: {
          completion_pct: number
          content_type: string
          occurred_at: string
          reason: string
          source: string
          video_id: string
          video_title: string
          watch_seconds: number
        }[]
      }
      analytics_user_summary: {
        Args: { target_user_id: string }
        Returns: {
          avg_completion_pct: number
          first_viewed_at: string
          last_viewed_at: string
          total_finishes: number
          total_views: number
          total_watch_seconds: number
          unique_videos: number
          views_last_7d: number
          watch_seconds_last_7d: number
        }[]
      }
      analytics_user_top_videos: {
        Args: { result_limit?: number; target_user_id: string }
        Returns: {
          best_completion_pct: number
          content_type: string
          total_views: number
          total_watch_seconds: number
          video_id: string
          video_title: string
        }[]
      }
      analytics_watch_heatmap_range: {
        Args: { date_from: string; date_to: string }
        Returns: {
          day_of_week: number
          hour_of_day: number
          unique_viewers: number
          view_starts: number
        }[]
      }
      anonymize_old_analytics: { Args: never; Returns: number }
      auto_delete_old_submissions: {
        Args: never
        Returns: {
          deleted_count: number
        }[]
      }
      calculate_commission: {
        Args: { level: string; tier: string }
        Returns: number
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      get_commission_rate: { Args: { level: string }; Returns: number }
      increment_message_unread: {
        Args: { conversation_uuid: string; recipient_uuid: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
      refresh_analytics_views: { Args: never; Returns: undefined }
    }
    Enums: {
      message_conversation_status: "active" | "requested" | "archived"
      report_reason:
        | "spam"
        | "harassment"
        | "hate_speech"
        | "sexual_content"
        | "violence"
        | "misinformation"
        | "other"
      report_status: "pending" | "reviewing" | "action_taken" | "dismissed"
      report_target_type:
        | "department_post"
        | "video_comment"
        | "profile"
        | "governance_proposal"
        | "department_reply"
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
      message_conversation_status: ["active", "requested", "archived"],
      report_reason: [
        "spam",
        "harassment",
        "hate_speech",
        "sexual_content",
        "violence",
        "misinformation",
        "other",
      ],
      report_status: ["pending", "reviewing", "action_taken", "dismissed"],
      report_target_type: [
        "department_post",
        "video_comment",
        "profile",
        "governance_proposal",
        "department_reply",
      ],
    },
  },
} as const
