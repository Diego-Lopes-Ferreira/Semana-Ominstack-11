import React from 'react';

export default function Header({children}) {
  return (
    <header>
      <h1>Be The Hero - { children }</h1>
    </header>
  );
}
