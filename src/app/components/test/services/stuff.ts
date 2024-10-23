/**
* @konstantinosporo
* A simple array of book ojects.
* Adjusting this array will update the books
* in the Library route.
*/
bookItems: Book[] = [
{
title: 'The Great Gatsby',
author: 'F. Scott Fitzgerald',
realeaseDate: new Date(1925, 3, 10),
description: 'A novel set in the Roaring Twenties that follows the enigmatic Jay Gatsby and his obsession with the
beautiful Daisy Buchanan.',
availability: true,
readinTime: '5h',
imageUrl: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=600',
},
{
title: '1984',
author: 'George Orwell',
realeaseDate: new Date(1949, 5, 8),
description: 'A dystopian novel that explores the dangers of totalitarianism and extreme political ideology through the
story of Winston Smith.',
availability: false,
readinTime: '6h',
imageUrl: 'https://images.pexels.com/photos/904620/pexels-photo-904620.jpeg?auto=compress&cs=tinysrgb&w=600',
},
{
title: 'Pride and Prejudice',
author: 'Jane Austen',
realeaseDate: new Date(1813, 0, 28),
description: 'A classic novel that explores themes of love, reputation, and class through the story of Elizabeth Bennet
and Mr. Darcy.',
availability: true,
readinTime: '8h',
imageUrl: 'https://images.pexels.com/photos/2090104/pexels-photo-2090104.jpeg?auto=compress&cs=tinysrgb&w=600',
},
{
title: 'To Kill a Mockingbird',
author: 'Harper Lee',
realeaseDate: new Date(1960, 6, 11),
description: 'A coming-of-age story that deals with serious issues like racial inequality and moral growth, as seen
through the eyes of young Scout Finch.',
availability: true,
readinTime: '7h',
imageUrl: 'https://images.pexels.com/photos/3747497/pexels-photo-3747497.jpeg?auto=compress&cs=tinysrgb&w=600',
},
];