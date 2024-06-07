"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h2>Oh no!</h2>
      <p>There was an issue with our server</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
