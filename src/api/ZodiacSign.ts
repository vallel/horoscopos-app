export default function getZodiacSignByDate(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let zodiac = "";

  SIGNS.forEach((sign: Sign) => {
    if (
      (month === sign.min.month && day >= sign.min.day) ||
      (month === sign.max.month && day <= sign.max.day)
    ) {
      zodiac = sign.key;
      return;
    }
  });

  return zodiac;
}

const SIGNS: Array<Sign> = [
  {
    name: "Aries",
    key: "Aries",
    min: { month: 3, day: 21 },
    max: { month: 4, day: 20 },
  },
  {
    name: "Tauro",
    key: "Taurus",
    min: { month: 4, day: 21 },
    max: { month: 5, day: 21 },
  },
  {
    name: "Géminis",
    key: "Gemini",
    min: { month: 5, day: 22 },
    max: { month: 6, day: 21 },
  },
  {
    name: "Cáncer",
    key: "Cancer",
    min: { month: 6, day: 22 },
    max: { month: 7, day: 23 },
  },
  {
    name: "Leo",
    key: "Leo",
    min: { month: 7, day: 23 },
    max: { month: 8, day: 23 },
  },
  {
    name: "Virgo",
    key: "Virgo",
    min: { month: 8, day: 24 },
    max: { month: 9, day: 23 },
  },
  {
    name: "Libra",
    key: "Libra",
    min: { month: 9, day: 24 },
    max: { month: 10, day: 23 },
  },
  {
    name: "Escorpio",
    key: "Scorpio",
    min: { month: 10, day: 24 },
    max: { month: 11, day: 22 },
  },
  {
    name: "Sagitario",
    key: "Sagittarius",
    min: { month: 11, day: 23 },
    max: { month: 12, day: 21 },
  },
  {
    name: "Capricornio",
    key: "Capricorn",
    min: { month: 12, day: 22 },
    max: { month: 1, day: 20 },
  },
  {
    name: "Acuario",
    key: "Aquarius",
    min: { month: 1, day: 21 },
    max: { month: 2, day: 19 },
  },
  {
    name: "Piscis",
    key: "Pisces",
    min: { month: 2, day: 20 },
    max: { month: 3, day: 20 },
  },
];

interface Sign {
  name: string;
  key: string;
  min: DateRef;
  max: DateRef;
}

interface DateRef {
  month: number;
  day: number;
}