import * as React from 'react';

const logos = [
  {
    name: 'React',
    image: 'http://i.imgur.com/TqOKThW.png',
    styles: {
      backgroundColor: '#00d8ff'
    }
  },
  {
    name: 'TypeScript',
    image: 'http://i.imgur.com/te9DJ55.png',
    styles: {
      backgroundColor: '#007acc'
    }
  },
  {
    name: 'Redux',
    image: 'http://i.imgur.com/29VnAI1.png',
    styles: {
      backgroundColor: '#764abc'
    }
  }
]

interface Brand {  
  name: string,
  image: string,
  styles: object
}

const aBrand = (brand: Brand, index: number) => {
  return (
    <div key={index} className="col-xs-4 aBrand" style={brand.styles}>
      <img src={brand.image} />
    </div>
  )
}

export default () => {
  return (
    <div className="containerFluid">
      {
        logos.map(aBrand)
      }
    </div>
  );
};
