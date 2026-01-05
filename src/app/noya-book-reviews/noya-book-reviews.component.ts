import { Component } from '@angular/core';
interface BookContentItem {
  content: string;
  reviewer: string;
  platform: string;
}
@Component({
  selector: 'noya-noya-book-reviews',
  standalone: true,
  imports: [],
  templateUrl: './noya-book-reviews.component.html',
  styleUrl: './noya-book-reviews.component.scss'
})
export class NoyaBookReviewsComponent {

  items: BookContentItem[] = [
    {
      content: $localize `A charming and musical book.
The author, an international marimba and percussion musician, conveys through this book a broad range of information about rhythm, notes, various musical instruments, and the relationships between them.
The book is very enjoyable and at the same time teaches children about the world of music, the possibilities inherent in the different instruments, and their unique shapes and sounds.
A wonderful children’s book, highly recommended for all ages.`,
      reviewer: $localize `Dr. Ilana Maor`,
      platform: $localize `Book Reviews and Critiques`
    },
    {
      content: $localize `A charming and enjoyable children’s book.
Throughout the book, the text corresponds with the original, wonderful, and colorful illustrations by Rafael Miron and Jen Pantucha, which illuminate the story with a multitude of colors and add to its uniqueness.
It introduces children to the world of percussion instruments. They especially enjoyed scanning the barcodes and watching the videos.
Of course, it also sparked a strong desire in them to play percussion instruments themselves. You’ve been warned!`,
      reviewer: $localize `Orit Inbar`,
      platform: $localize `The Beautiful Life`
    },
    {
      content: $localize `A fun children’s book, full of rhymes, that takes the young reader into a pleasant world filled with music and creativity.
The story is a huge celebration, full of sound and movement.
The illustrations are wonderful, colorful, and full of life, and they enhanced the experience.`,
      reviewer: $localize `Yaelchi`,
      platform: $localize `Book Reviews`
    },
    {
      content: $localize `A charming children’s book that introduces children to the percussion family.
The author is an international marimba and percussion artist, and her love for the world of percussion instruments is clearly felt.
In the videos, she explains and demonstrates calmly and simply, producing various sounds.
A delight.`,
      reviewer: $localize `Shula Gold`,
      platform: $localize `Shula Reviews`
    },
    {
      content: $localize `Want to know which percussion instruments exist? What is a snare? What does the xylophone do? You’ll have to read the book and find out.
The book is written in a flowing, light, and pleasant style, in rhymes and with vowelization.
Each page includes a barcode linking to a video explaining the instrument.
The illustrations are cheerful, colorful, and age-appropriate.
I especially loved the story about Drum’s home and the joyful atmosphere.`,
      reviewer: $localize `Dafna Tegar`,
      platform: $localize `Games and Books Recommended for Children`
    },
    {
      content: $localize `A special and thought-provoking story.
With unique humor, the author explains the different percussion instruments.
Together with wonderful illustrations and scan codes on every page, the percussion family comes to life.
A colorful, inviting, and wonderful book for every child.`,
      reviewer: $localize `Siggy Kadosh`,
      platform: $localize `On Life and Everything in Between`
    },
    {
      content: $localize `Without a doubt, a happy and cheerful children’s book — a splendid musical celebration.
The story of the young drum is heartwarming and amusing, written in rhymes and accompanied by beautiful illustrations.
It teaches the beauty of rhythmic music and the important role of drums in every musical performance.
Pure delight, especially with the musical videos accessible via scan codes.`,
      reviewer: $localize `Yehudit Bagan`,
      platform: $localize `Open Book`
    },
    {
      content: $localize `Love to play music? Love drums and percussion? This lovely book is for you.
Even curious readers who enjoy learning new things will love it.
My children and I learned, were enchanted, and enjoyed both the book and the videos.`,
      reviewer: $localize `Orna Shafi`,
      platform: $localize `The Book Parliament`
    },
    {
      content: $localize `This week I received Noya Shalein’s wonderful book and read it with my eldest grandson.
We watched the videos and started tapping on anything we could find at home.
A joyful rhyming story that sparks imagination.
A unique experiential project that brings children closer to percussion instruments.
An excellent musical book for every home.`,
      reviewer: $localize `Riki Baruch`,
      platform: $localize `Right Choices`
    },
    {
      content: $localize `A book for children — and not only.
A three-dimensional enjoyment of fun, music, and creativity.
The explanations and demonstrations are pleasant to the eye and ear.
The sounds are created by the instrument, the material, the sticks, the hands — and the love of the player.
A charming, fascinating, and unique book.
Highly recommended.`,
      reviewer: $localize `Ahuva Oberstein`,
      platform: $localize `Book Reviewer`
    },
    {
      content: $localize `Who doesn’t love to beat on a drum?
This beautifully illustrated book offers a visual and auditory glimpse into the percussion family.
A multisensory pleasure.
It teaches while providing pure enjoyment.
The videos enrich both children and adults.
One of the best books I’ve read to my grandchildren recently.`,
      reviewer: $localize `Rachel Rozilio`,
      platform: $localize `The Book Parliament`
    }
  ];

}
