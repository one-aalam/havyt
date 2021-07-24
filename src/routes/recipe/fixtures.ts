import { Recipe } from './types'

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: 'Chicken Flautas',
    desc: 'These Chicken Flautas are filled with chicken, salsa, and cheese and baked in the oven until crispy. Your whole family will love this easy, delicious recipe.',
    imageUrl:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/5/27/0/RE0409_Chicken-Flautas_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371597437923.jpeg',
    cuisineId: 4,
    courseId: 7,
    serves: 6,
    prepTime: 5,
    cookingTime: 15,
    ingredients: [
      '1/2kg Chicken',
      '6 ounces cream cheese',
      '1 cup Monterey Jack cheese shredded',
      '1/3 cup salsa',
      'salt and pepper to taste',
      '6 flour tortillas soft taco size',
    ],
    directions: [
      'Preheat oven to 400-degrees. Combine chicken, cream cheese, Monterey Jack cheese, salsa, and salt & pepper in a medium-sized bowl. Mix together well.',
      'Evenly distribute chicken mixture over each tortilla, making a line down the middle of each tortilla and then rolling them up tight.',
      'Line a baking sheet with aluminum foil and spray with cooking spray. Place rolled up tortillas evenly spaced on the cookie sheet (seam side down) and spray cooking spray generously over the top.',
      'Bake for 10-15 minutes or until tortillas become golden-brown.',
    ],
    source: 'https://www.yummly.com/recipe/Easy-Chicken-Flautas-2363416',
    tags: ['Flautas', 'Chicken Flautas'],
  },
  {
    id: 2,
    name: 'Curried chicken salad',
    desc: '',
    imageUrl: 'https://www.chatelaine.com/wp-content/uploads/2013/05/Curried-chicken-salad.jpg',
    cuisineId: 4,
    courseId: 7,
    serves: 6,
    prepTime: 5,
    cookingTime: 15,
    ingredients: [
      '3kg skinless, boneless chicken breasts, halved lengthwise',
      '1/2 cup mayonnaise',
      '1 tbsp lemon zest',
      '1 tbsp lemon juice',
      '1 1/2 tsp curry powder',
      '1/4 tsp salt',
      '2 ripe mangoes, diced',
      '1/4 cup dried cranberries',
      '2 green onions, thinly sliced',
      '1 celery stalk, finely chopped',
      '6 leaves Boston lettuce',
      '6 English muffins, toasted',
    ],
    directions: [
      'ARRANGE chicken in a single layer in a large pot.',
      'Add water to just cover.',
      'Bring to a boil over medium-high.',
      'Flip chicken, reduce heat to medium and simmer until cooked, about 6 more min.',
      'Cool.',
      'STIR mayo with lemon zest, juice, curry and salt in large bowl.',
      'Using 2 forks, shred chicken, then stir into mayo mixture with mango, cranberries, green onions and celery.',
      'Divide among muffins with lettuce leaves',
      'Sandwich with tops',
    ],
    source: 'http://www.chatelaine.com/recipe/stovetop-cooking-method/curried-chicken-salad/',
    tags: ['Chicken'],
  },
  {
    id: 3,
    name: 'Greek Salad',
    source: 'Food Network (two different recipes)',
    imageUrl: '',
    cuisineId: 6,
    courseId: 8,
    prepTime: 0,
    cookingTime: 0,
    serves: 4,
    directions: [
      'In a small bowl, whisk together the lemon juice, garlic, salt, and oil',
      'Set aside',
      'In a large bowl lightly toss the lettuce with the …umber, tomatoes, onion, oregano, and black pepper',
      'Let sit up to 2 hours',
      'To serve, toss salad with dressing and place sliced chicken on top',
    ],
    ingredients: [
      '6 tablespoon lemon juice',
      '2 clove garlic, minced',
      '2 teaspoon kosher salt, plus more to taste',
      '1 cup extra-virgin olive oil, preferably Greek',

      '1 head romaine lettuce, trimmed of tough stems and torn into bite-sized pieces',
      '1 cup kalamata olives, about 6oz/cup',
      '1/2 pound Feta cheese, crumbled',
      '1 cucumber, trimmed, cut into 1 inch chunks',
      '1 1/2 cup grape tomatoes, halved',
      '1 small red onion, cut into 1/2-inch wedges, soaked in cold water for 5 minutes and drained',
      '2 teaspoon dried oregano',
      'Freshly ground black pepper',
    ],
    tags: ['main', 'greek', 'salad', 'dressing'],
  },
  {
    id: 4,
    name: 'Flaky Buttermilk Biscuits',
    source: 'Cooks Illustrated (All-Time Best Recipes 2010)',
    prepTime: 0,
    cookingTime: 0,
    serves: 12,
    cuisineId: 4,
    courseId: 5,
    directions: [
      'Adjust oven rack to lower-middle position; heat oven to 450 degrees',
      'Whisk flour, baking power, baking soda, and salt in large bowl',
      'Add shortening to flour mixture; break up chunks with fingertips until only pea-sized pieces remain',
      'Working in batches, drop butter slices into flour …floured fingertips into flat, nickel-sized pieces',
      'Repeat until all butter is incorporated; toss to combine',
      'Freeze mixture (in bowl) until chilled, about 15 minutes',
      'Spray 24-square-inch work surface with nonstick co… across surface with kitchen towel or paper towel',
      'Sprinkle 1/3 cup of extra flour across sprayed are…work surface with palm to form thin, even coating',
      'Add all but 2 tablespoons of buttermilk to flour m…sticky and shaggy but should clear sides of bowl)',
      'With rubber spatula, transfer dough onto center of…ed hands, bring dough together into cohesive ball',
      'Pat dough into approximate 10-inch square; roll in…usting dough and rolling pin with flour as needed',
      'Using bench scraper or thin metal spatula, fold do… again to form approximate 6- by 4-inch rectangle',
      'Rotate dough 90 degrees, dusting work surface unde…nd fold dough again, dusting with flour as needed',
      'Roll dough into 10-inch square about 1/2 inch thic…er, dipping cutter back into flour after each cut',
      'Carefully invert and transfer rounds to ungreased baking sheet, spaced 1 inch apart',
      'Gather dough scraps into ball; roll and fold once or twice until scraps form smooth dough',
      'Roll dough into 1/2-inch-thick round; cut 3 more 3-inch rounds and transfer to baking sheet',
      'Discard excess dough',
      'Brush biscuit tops with melted butter',
      'Bake, without opening oven door, until tops are golden brown and crisp, 15 to 17 minutes',
      'Let cool on baking sheet 5 to 10 minutes before serving',
      '',
    ],
    ingredients: [
      '8 tablespoon unsalted butter, cold, lightly floured and cut into 1/8-inch slices',
      '2 tablespoon vegetable shortening, cut into 1/2-inch chunks',
      '1 teaspoon salt',
      '1 tablespoon baking powder',
      '1/2 teaspoon baking soda',
      '2 1/2 cup unbleached all-purpose flour',
      '2 tablespoon butter, melted',
      '1 1/4 cup buttermilk, cold',
    ],
    tags: ['biscuits', 'bread', 'sides'],
  },
  {
    id: 5,
    name: 'Margherita Salad',
    source: 'Adapted from Food Network Magazine (Chicken Parmesan Salad)',
    prepTime: 0,
    cookingTime: 0,
    serves: 4,
    cuisineId: 6,
    courseId: 3,
    directions: [
      'Puree the plum tomato, sun-dried tomatoes, vinegar…rizzling in the sun-dried tomato oil until smooth',
      'Add 2 to 3 tablespoons water, if needed to make a pour-able dressing; season with salt and pepper',
      'Heat the olive oil in a large skillet over medium-high heat',
      'Add the breadcrumbs, season with salt and pepper a…rring occasionally, until golden, about 2 minutes',
      'Add the remaining parmesan and the parsley and cook until toasted, about 1 more minute',
      'Toss the salad greens, mozzarella, and remaining basil in a large bowl',
      'Toss with the dressing, then sprinkle with the breadcrumb mixture',
    ],
    ingredients: [
      '1 plum tomato, halved',
      '4 sun-dried tomatoes packed in oil',
      '2 tablespoon oil from the sun-dried tomato jar',
      '2 tablespoon red wine vinegar',
      '1 clove garlic',
      '1/2 teaspoon dried oregano',
      '1/4 bunch fresh basil, torn',
      '2 tbsp parmesan, grated',
      'Kosher salt and freshly ground pepper',

      '2 tablespoon extra-virgin olive oil',
      '1 cup breadcrumbs',
      '2 tablespoon chopped fresh parsley',
      '1/4 cup parmesan, grated',

      '8 cup Italian-blend salad greens',
      '3/4 bunch fresh basil, chiffonade',
      '8 ounce bocconcini (mozzarella), quartered',
    ],
    tags: ['salad', 'dressing', 'main'],
  },
  {
    id: 6,
    name: 'Mexican Ensalada',
    source: 'Yuri Elkaim',
    prepTime: 0,
    cookingTime: 0,
    serves: 2,
    cuisineId: 4,
    courseId: 2,
    directions: [
      'In small bowl, whisk together dressing ingredients',
      'Chop up additional ingredients bite size and add to a medium bowl',
      'Combine dressing and all ingredients in a large bowl, toss, and serve',
    ],
    ingredients: [
      '1 lime, zested and juiced',
      '1 tablespoon balsamic vinegar',
      '1/4 cup basil leaves, chopped',
      '1/2 teaspoon cumin',
      '2 tablespoon extra-virgin olive oil',
      'Kosher salt and freshly ground black pepper',

      '1/2 cucumber, cubed',
      '1 avocado, cubed',
      '1 red bell pepper, cubed',
      '1/2 cup black beans, rinsed and drained',
      '1 tomato, cubed',
      '1/2 cup brown rice, cooked',
    ],
    tags: ['salad', 'mexican', 'FUF', 'main', 'vegetarian'],
  },
  {
    id: 7,
    name: 'Sweet Almond Date Smoothie',
    source: 'Yuri Elkaim',
    prepTime: 0,
    cookingTime: 0,
    serves: 2,
    cuisineId: 6,
    courseId: 3,
    directions: ['Combine all ingredients in blender. Blend until smooth.'],
    ingredients: [
      '1 banana',
      '2 tbsp almond butter',
      '6 dates',
      '1 tsp maple syrup',
      '2 tsp cinnamon',
      '2 cup almond milk, or skim milk',
    ],
    tags: ['smoothie', 'FUF', 'breakfast'],
  },
  {
    id: 8,
    name: 'The Shake',
    source: 'Yuri Elkaim',
    prepTime: 0,
    cookingTime: 0,
    serves: 2,
    cuisineId: 9,
    courseId: 3,
    directions: ['Combine all ingredients in blender. Blend until smooth.'],
    ingredients: [
      '1 scoop protein powder (optional)',
      '1 tbsp ground flax seeds',
      '2 tbsp hemp seeds',
      '2 tbsp peanut butter',
      '1 banana',
      '1 cup raspberries',
      '1 cup blueberries',
      '1 1/2 cup milk',
    ],
    tags: ['smoothie', 'FUF', 'breakfast'],
  },
  {
    id: 9,
    name: 'Pasta with roasted vegetables and bacon',
    source: 'Martha Stewart Living Oct 2011',
    prepTime: 900,
    cookingTime: 1800,
    serves: 4,
    cuisineId: 4,
    courseId: 6,
    directions: [
      '1',
      'Preheat oven to 400F',
      'Heat oil in a small skillet over medium heat',
      'Cook bacon until crisp, about 8 minutes',
      'Transfer to paper towels using a slotted spoon',
      'Reserve drippings',
      '2',
      'Toss sweet potato, onion, and cauliflower with reserved drippings',
      'Season with salt and pepper',
      'Roast on a rimmed baking sheet, tossing halfway th…h, until tender and caramelized, about 35 minutes',
      '3',
      'Meanwhile, cook pasta in a large pot of salted water until al dente',
      'Drain, reserving 1 cup cooking water',
      'Return pasta to pot with cooking water, and toss with grated cheese and vegetables',
      'Stir in parsley',
      'Sprinkle bacon over top',
      'Garnish with shaved cheese',
    ],
    ingredients: [
      '2 tbsp extra-virgin olive oil',
      '2 oz bacon, preferably slab, chopped',
      '1 medium sweet potato, peel and cut into 1/2-inch cubes',
      '1 small onion, thinly sliced',
      '1/2 head cauliflower, trimmed into 1 1/2-inch florets (about 2 1/2 cups)',
      '3/4 tsp salt',
      '1/4 tsp pepper',
      '8 oz orecchiette pasta',
      '1 1/2 oz Parmesan cheese, finely grated (about 3/4 cup), plus more, shaved, for garnish',
      '1/2 cup fresh parsley, coarsely chopped',
    ],
    tags: ['pasta', 'main'],
  },
  {
    id: 10,
    name: 'Triple Grilled Cheese',
    source: 'Based on Food Network Magazine’s “Triple grilled cheese with tomato soup”, Sept 2010.',
    prepTime: 600,
    cookingTime: 480,
    serves: 4,
    cuisineId: 4,
    courseId: 8,
    directions: [
      'Combine all three cheeses in a bowl',
      'Divide evenly among 4 bread slices and top with the remaining bread',
      'Heat 1 tablespoon butter in a large skillet or griddle over medium heat',
      'Cook the sandwiches in batches, adding the remaini…lts and the bread is golden, 3-4 minutes per side',
      'Serve the sandwiches with the soup',
    ],
    ingredients: [
      '1 cup shredded muenster cheese (about 4 oz)',
      '1 cup shredded mozzarella cheese (about 4 oz)',
      '1/2 cup grated Parmesan cheese (about 1 oz)',
      '8 slices thick sandwich bread',
      '2 tablespoon unsalted butter',
    ],
    tags: ['sandwich', 'cheese', 'main'],
  },
  {
    id: 11,
    name: 'Pizza bianca',
    source: 'Everyday Food June 2011',
    prepTime: 0,
    cookingTime: 0,
    serves: 4,
    cuisineId: 6,
    courseId: 8,
    directions: [
      'Preheat oven to 500',
      'Lightly dust a work surface, rolling pin, and a baking sheet with flour',
      'Roll dough out to a 13-inch round and transfer to sheet',
      'In a small bowl, stir together ricotta, oil and garlic; season with salt and pepper',
      'Spread ricotta mixture on dough, leaving a 1/2-inch border',
      'Top with mozzarella, then Parmesan',
      'Brush oil on edge of dough',
      'Bake until crust is golden and cheese is melted and browned in spots, 12 to 14 minutes',
      'In a small bowl, toss arugula with oil and season to taste with salt and pepper',
      'Top pizza with arugula and serve',
    ],
    ingredients: [
      'all-purpose flour, for dusting and rolling',
      '1 pound pizza dough, thawed if frozen',
      '1 teaspoon extra-virgin olive oil, for brushing',

      '1/2 cup whole-milk ricotta cheese',
      '1 tablespoon extra-virgin olive oil',
      '1 garlic clove, minced',
      'salt and freshly ground pepper',

      '6 oz mozzarella, shredded',
      '1 oz Parmesan, grated (or Pecorino Romano)',
      '2 oz baby arugula',
      '1 tsp extra-virgin olive oil',
    ],
    tags: ['pizza', 'vegetarian', 'main'],
  },
  {
    id: 12,
    name: 'Mediterranean Patio Pizza',
    source: 'http://new.pamperedchef.com/recipe/10006',
    prepTime: 0,
    cookingTime: 0,
    serves: 4,
    cuisineId: 10,
    courseId: 8,
    directions: [
      'Preheat oven to 375°F',
      'Roll out dough',
      'Lightly spray dough with olive oil, then add garlic',
      'Bake 14-16 minutes or until golden brown; cool completely',
      'For cheese spread, finely chop enough artichoke hearts to make 1/4 cup',
      'Combine with cream cheese, half of the feta cheese and oregano in bowl; mix well',
      'Spread mixture evenly over crust',
      'For toppers, quarter remaining artichoke hearts',
      'Arrange them and all other vegetables over cream cheese mixture',
      'Sprinkle with remaining feta cheese and pine nuts',
      'Drizzle with salad dressing just before serving',
    ],
    ingredients: [
      '1 lb refrigerated pizza dough',
      'Olive oil',
      '1 garlic clove, pressed',

      '1 14oz can artichoke hearts in water, drained, divided',
      '4 ounce cream cheese, softened',
      '4 ounce feta cheese, crumbled, divided',
      '1/2 teaspoon dried oregano',

      '2 plum tomatoes, seeded and chopped',
      '1/3 cup black olives, pitted and sliced',
      '1/3 cup cucumber, sliced and quartered',
      '1/4 small red onion, sliced into thin wedges',
      '2 tablespoon pine nuts, toasted (optional)',
      '2 tbsp olive oil',
      '1 tbsp red wine vinegar',
      '1/2 tsp dijon mustard ',
      'salt and pepper',
    ],
    tags: ['pizza', 'main', 'vegetarian'],
  },
]

export const CUISINES = [
  {
    id: 1,
    name: 'American',
  },
  {
    id: 2,
    name: 'Italian',
  },
  {
    id: 3,
    name: 'Asian',
  },
  {
    id: 4,
    name: 'Mexican',
  },
  {
    id: 5,
    name: 'Southern & Soul Food',
  },
  {
    id: 6,
    name: 'French',
  },
  {
    id: 7,
    name: 'Barbecue',
  },
  {
    id: 8,
    name: 'Indian',
  },
  {
    id: 9,
    name: 'Chinese',
  },
  {
    id: 10,
    name: 'Mediterranean',
  },
  {
    id: 11,
    name: 'Greek',
  },
  {
    id: 12,
    name: 'English',
  },
  {
    id: 13,
    name: 'Spanish',
  },
]

export const COURSES = [
  {
    id: 1,
    name: 'Appetizers',
  },
  {
    id: 2,
    name: 'Breakfast',
  },
  {
    id: 3,
    name: 'Brunch',
  },
  {
    id: 4,
    name: 'Kid-Friendly',
  },
  {
    id: 5,
    name: 'Dessert',
  },
  {
    id: 6,
    name: 'Dinner',
  },
  {
    id: 7,
    name: 'Lunch',
  },
  {
    id: 8,
    name: 'Main Dish',
  },
  {
    id: 9,
    name: 'Salad',
  },
]
