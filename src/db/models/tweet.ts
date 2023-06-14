import { TweetDocument } from "../interfaces/tweet.interfaces";
import mongoose, { Schema } from "mongoose";

// this is the schema for the tweet object
const tweetSchema = new Schema<TweetDocument>(
  {
    created_at: { type: String, required: true },
    id: { type: Number, required: true },
    id_str: { type: String, required: true },
    text: { type: String, required: true },
    truncated: { type: Boolean, required: true },
    entities: {
      hashtags: { type: [String], required: true },
      symbols: { type: [String], required: true },
      user_mentions: [
        {
          screen_name: { type: String, required: true },
          name: { type: String, required: true },
          id: { type: Number, required: true },
          id_str: { type: String, required: true },
          indices: { type: [Number], required: true },
        },
      ],
      urls: { type: [Schema.Types.Mixed], required: true },
    },
    source: { type: String, required: true },
    in_reply_to_status_id: { type: Number, required: false },
    in_reply_to_status_id_str: { type: String, required: false },
    in_reply_to_user_id: { type: Number, required: false },
    in_reply_to_user_id_str: { type: String, required: false },
    in_reply_to_screen_name: { type: String, required: false },
    user: {
      id: { type: Number, required: true },
      id_str: { type: String, required: true },
      name: { type: String, required: true },
      screen_name: { type: String, required: true },
      location: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String, required: true },
      entities: {
        url: {
          urls: [
            {
              url: { type: String, required: true },
              expanded_url: { type: String, required: true },
              display_url: { type: String, required: true },
              indices: { type: [Number], required: true },
            },
          ],
        },
        description: {
          urls: [
            {
              url: { type: String, required: true },
              expanded_url: { type: String, required: true },
              display_url: { type: String, required: true },
              indices: { type: [Number], required: true },
            },
          ],
        },
      },
      protected: { type: Boolean, required: true },
      followers_count: { type: Number, required: true },
      friends_count: { type: Number, required: true },
      listed_count: { type: Number, required: true },
      created_at: { type: String, required: true },
      favourites_count: { type: Number, required: true },
      utc_offset: { type: Number, required: false },
      time_zone: { type: String, required: false },
      geo_enabled: { type: Boolean, required: true },
      verified: { type: Boolean, required: true },
      statuses_count: { type: Number, required: true },
      lang: { type: String, required: false },
      contributors_enabled: { type: Boolean, required: true },
      is_translator: { type: Boolean, required: true },
      is_translation_enabled: { type: Boolean, required: true },
      profile_background_color: { type: String, required: true },
      profile_background_image_url: { type: String, required: true },
      profile_background_image_url_https: { type: String, required: true },
      profile_background_tile: { type: Boolean, required: true },
      profile_image_url: { type: String, required: true },
      profile_image_url_https: { type: String, required: true },
      profile_banner_url: { type: String, required: true },
      profile_link_color: { type: String, required: true },
      profile_sidebar_border_color: { type: String, required: true },
      profile_sidebar_fill_color: { type: String, required: true },
      profile_text_color: { type: String, required: true },
      profile_use_background_image: { type: Boolean, required: true },
      has_extended_profile: { type: Boolean, required: true },
      default_profile: { type: Boolean, required: true },
      default_profile_image: { type: Boolean, required: true },
      following: { type: Boolean, required: true },
      follow_request_sent: { type: Boolean, required: true },
      notifications: { type: Boolean, required: true },
      translator_type: { type: String, required: true },
      withheld_in_countries: { type: [String], required: true },
    },
    geo: { type: Schema.Types.Mixed, required: false },
    coordinates: { type: Schema.Types.Mixed, required: false },
    place: { type: Schema.Types.Mixed, required: false },
    contributors: { type: Schema.Types.Mixed, required: false },
    is_quote_status: { type: Boolean, required: true },
    retweet_count: { type: Number, required: true },
    favorite_count: { type: Number, required: true },
    favorited: { type: Boolean, required: true },
    retweeted: { type: Boolean, required: true },
    lang: { type: String, required: true },
  },
  {
    timestamps: false,
    collection: "Tweet",
  }
);

// this is the model for the tweet object
const TweetModel = mongoose.model<TweetDocument>("Tweet", tweetSchema);

export default TweetModel;
