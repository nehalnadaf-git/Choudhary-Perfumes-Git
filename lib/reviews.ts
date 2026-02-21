
import { Review } from './types';

// 2 product-specific reviews for each product, keyed by product slug
export const productReviews: Record<string, Review[]> = {

    // ─── Attars ───────────────────────────────────────────

    'sandal-attar': [
        {
            id: 'rev-san-01',
            customerName: 'Mohammed Irfan',
            rating: 5,
            date: '2025-12-15',
            productName: 'Sandal Attar',
            comment: 'The sandalwood quality is absolutely genuine. Reminds me of the traditional attars from my grandfather\'s collection. Lasts all day on my skin.',
            verified: true,
            avatarColor: '#D0AB64'
        },
        {
            id: 'rev-san-02',
            customerName: 'Faizan Ahmed',
            rating: 5,
            date: '2026-01-08',
            productName: 'Sandal Attar',
            comment: 'Rich and creamy sandalwood scent. I apply it before Jummah prayers and the fragrance stays till evening. Highly recommended for attar lovers.',
            verified: true,
            avatarColor: '#8B6F47'
        },
    ],

    'oud-attar': [
        {
            id: 'rev-oud-01',
            customerName: 'Abdul Rashid',
            rating: 5,
            date: '2025-11-20',
            productName: 'Oud Attar',
            comment: 'This oud attar is absolutely top-notch. Deep, woody, and long-lasting. I get compliments every time I wear it. Worth every rupee.',
            verified: true,
            avatarColor: '#5C4033'
        },
        {
            id: 'rev-oud-02',
            customerName: 'Bilal Khan',
            rating: 4,
            date: '2026-01-22',
            productName: 'Oud Attar',
            comment: 'Beautiful oud fragrance with great projection. The scent develops beautifully over the hours. My family loves this on me.',
            verified: true,
            avatarColor: '#6B4423'
        },
    ],

    'miziyan-attar': [
        {
            id: 'rev-miz-01',
            customerName: 'Saifuddin Patel',
            rating: 5,
            date: '2026-01-05',
            productName: 'Miziyan Attar',
            comment: 'Such a refreshing and uplifting attar. The floral notes are so natural and beautiful. Perfect for daily wear. MashAllah, excellent quality!',
            verified: true,
            avatarColor: '#7B9E6B'
        },
        {
            id: 'rev-miz-02',
            customerName: 'Junaid Shaikh',
            rating: 5,
            date: '2025-12-28',
            productName: 'Miziyan Attar',
            comment: 'I bought this as a gift for my father and he absolutely loves it. The fragrance is gentle yet long-lasting. We are now regular customers.',
            verified: true,
            avatarColor: '#4A7C59'
        },
    ],

    'musk-rijali': [
        {
            id: 'rev-mus-01',
            customerName: 'Hamza Qureshi',
            rating: 5,
            date: '2026-01-14',
            productName: 'Musk Rijali',
            comment: 'The musk in this is so clean and sophisticated. It sits close to the skin and gives a beautiful warm aura. My go-to daily fragrance now.',
            verified: true,
            avatarColor: '#9B7653'
        },
        {
            id: 'rev-mus-02',
            customerName: 'Owais Siddiqui',
            rating: 4,
            date: '2025-12-10',
            productName: 'Musk Rijali',
            comment: 'Pure musk scent that stays subtle and elegant throughout the day. Perfect for office wear. Impressed by Choudhary Perfumes quality.',
            verified: true,
            avatarColor: '#C4956A'
        },
    ],

    // ─── Designer Perfumes ────────────────────────────────

    'mystic-amber-oudh': [
        {
            id: 'rev-mao-01',
            customerName: 'Arshad Hussain',
            rating: 5,
            date: '2026-01-28',
            productName: 'Mystic Amber Oudh',
            comment: 'Absolutely stunning fragrance! The oud and amber blend is perfectly balanced. I get compliments everywhere I go. Best purchase this year.',
            verified: true,
            avatarColor: '#D4A574'
        },
        {
            id: 'rev-mao-02',
            customerName: 'Nabeel Ansari',
            rating: 5,
            date: '2026-02-05',
            productName: 'Mystic Amber Oudh',
            comment: 'This is Choudhary\'s best creation. The amber warmth combined with rich oud is heavenly. My wife also loves wearing it. True unisex gem!',
            verified: true,
            avatarColor: '#B8860B'
        },
    ],

    'dior-homme-intense-edp': [
        {
            id: 'rev-dhi-01',
            customerName: 'Yaseen Malik',
            rating: 5,
            date: '2025-12-22',
            productName: 'Dior Homme Intense EDP',
            comment: 'Smells exactly like the original Dior Homme Intense! The iris and cocoa notes are spot-on. Amazing quality at this price point.',
            verified: true,
            avatarColor: '#4169E1'
        },
        {
            id: 'rev-dhi-02',
            customerName: 'Rizwan Ali',
            rating: 5,
            date: '2026-01-18',
            productName: 'Dior Homme Intense EDP',
            comment: 'I\'ve compared this with the original and honestly, it\'s very close. Great projection and lasts 8+ hours easily. Will buy again InshAllah.',
            verified: true,
            avatarColor: '#2E4057'
        },
    ],

    'miss-dior-rose-essence-edt': [
        {
            id: 'rev-mdr-01',
            customerName: 'Zainab Khatoon',
            rating: 5,
            date: '2026-01-30',
            productName: 'Miss Dior Rose Essence EDT',
            comment: 'Such a beautiful feminine fragrance! The rose notes are so fresh and natural. I wear it daily and always get asked what perfume I\'m wearing.',
            verified: true,
            avatarColor: '#E8A0BF'
        },
        {
            id: 'rev-mdr-02',
            customerName: 'Ayesha Begum',
            rating: 4,
            date: '2025-11-15',
            productName: 'Miss Dior Rose Essence EDT',
            comment: 'Lovely rose fragrance that is both modern and elegant. Perfect for special occasions. The packaging was also very nice and secure.',
            verified: true,
            avatarColor: '#C77EB5'
        },
    ],

    'dolce-and-gabbana-devotion-parfum': [
        {
            id: 'rev-dgd-01',
            customerName: 'Imran Baig',
            rating: 5,
            date: '2026-02-01',
            productName: 'D&G Devotion Parfum',
            comment: 'The gourmand notes in this are incredible. Sweet but not overpowering. My wife bought it for me and I wear it almost every day.',
            verified: true,
            avatarColor: '#CD853F'
        },
        {
            id: 'rev-dgd-02',
            customerName: 'Shoaib Nadeem',
            rating: 4,
            date: '2025-12-05',
            productName: 'D&G Devotion Parfum',
            comment: 'Very unique scent that stands out from the crowd. The hazelnut cream note is addictive. Gets better as it dries down.',
            verified: true,
            avatarColor: '#A0522D'
        },
    ],

    'dolce-and-gabbana-the-one-edt': [
        {
            id: 'rev-dgo-01',
            customerName: 'Tariq Mahmood',
            rating: 5,
            date: '2026-01-10',
            productName: 'D&G The One EDT',
            comment: 'Classic gentleman scent. The tobacco and amber dry-down is absolutely magnetic. I\'ve worn the original before, this is very close.',
            verified: true,
            avatarColor: '#8B7355'
        },
        {
            id: 'rev-dgo-02',
            customerName: 'Asif Raza',
            rating: 5,
            date: '2025-12-18',
            productName: 'D&G The One EDT',
            comment: 'Excellent quality! Sophisticated and mature scent. I wore it to a family gathering and everyone complimented me. Thank you Choudhary Perfumes!',
            verified: true,
            avatarColor: '#6B4226'
        },
    ],

    'paco-rabanne-1-million-parfum': [
        {
            id: 'rev-prm-01',
            customerName: 'Shahbaz Ahmed',
            rating: 5,
            date: '2026-01-25',
            productName: '1 Million Parfum',
            comment: 'This is a beast mode fragrance! Lasts incredibly long and the projection is amazing. Sweet, leathery, and luxurious. My signature scent now.',
            verified: true,
            avatarColor: '#DAA520'
        },
        {
            id: 'rev-prm-02',
            customerName: 'Farhan Shaikh',
            rating: 5,
            date: '2025-11-28',
            productName: '1 Million Parfum',
            comment: 'SubhanAllah, what a fragrance! The salty-sweet opening is addictive. Perfect for winter evenings. Already placed my second order.',
            verified: true,
            avatarColor: '#B8860B'
        },
    ],

    'parfums-de-marly-delina-exclusif-parfum': [
        {
            id: 'rev-pdm-01',
            customerName: 'Nazia Sultana',
            rating: 5,
            date: '2026-02-08',
            productName: 'Delina Exclusif Parfum',
            comment: 'This is luxury in a bottle! The rose and vanilla combination is heavenly. I feel like royalty every time I wear it. MashAllah, beautiful creation.',
            verified: true,
            avatarColor: '#DB7093'
        },
        {
            id: 'rev-pdm-02',
            customerName: 'Saba Parveen',
            rating: 5,
            date: '2025-12-30',
            productName: 'Delina Exclusif Parfum',
            comment: 'Worth every penny! The fruity rose opening melts into a gorgeous creamy base. Lasts all day and the sillage is perfect. Will recommend to all!',
            verified: true,
            avatarColor: '#C06C84'
        },
    ],

    'versace-pour-homme-edt': [
        {
            id: 'rev-vph-01',
            customerName: 'Adnan Choudhary',
            rating: 5,
            date: '2026-01-12',
            productName: 'Versace Pour Homme EDT',
            comment: 'Fresh and clean, perfect for our Indian summers. The aquatic notes are so refreshing. My daily office fragrance. Highly recommend!',
            verified: true,
            avatarColor: '#4682B4'
        },
        {
            id: 'rev-vph-02',
            customerName: 'Mushtaq Karim',
            rating: 4,
            date: '2025-11-10',
            productName: 'Versace Pour Homme EDT',
            comment: 'A very versatile fragrance that works in any setting. The Mediterranean vibe is uplifting. Good longevity for a fresh scent. Happy customer!',
            verified: true,
            avatarColor: '#5F9EA0'
        },
    ],

    'ysl-libre-le-parfum': [
        {
            id: 'rev-ylp-01',
            customerName: 'Mariam Fatima',
            rating: 5,
            date: '2026-02-10',
            productName: 'YSL Libre Le Parfum',
            comment: 'Bold and feminine at the same time. The lavender and vanilla combination is gorgeous. I feel so confident when I wear this. Absolutely love it!',
            verified: true,
            avatarColor: '#7B68EE'
        },
        {
            id: 'rev-ylp-02',
            customerName: 'Rukhsar Khan',
            rating: 5,
            date: '2025-12-20',
            productName: 'YSL Libre Le Parfum',
            comment: 'This perfume makes me feel like a boss woman! The orange blossom note is divine. Got it for my birthday and it\'s my favourite gift this year.',
            verified: true,
            avatarColor: '#6A5ACD'
        },
    ],

    'ysl-y-le-parfum': [
        {
            id: 'rev-yyp-01',
            customerName: 'Zubair Hassan',
            rating: 5,
            date: '2026-01-20',
            productName: 'YSL Y Le Parfum',
            comment: 'Dark, intense, and masculine. The woody and vanilla dry-down is incredible. This is a true night-out fragrance. Compliment magnet!',
            verified: true,
            avatarColor: '#2F4F4F'
        },
        {
            id: 'rev-yyp-02',
            customerName: 'Kamran Mirza',
            rating: 4,
            date: '2025-11-25',
            productName: 'YSL Y Le Parfum',
            comment: 'Very close to the original YSL Y. The lavender intensity and sensual vanilla make it perfect for cold weather. Great value for money.',
            verified: true,
            avatarColor: '#3C565B'
        },
    ],
};
