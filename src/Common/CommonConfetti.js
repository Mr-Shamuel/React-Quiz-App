import React from 'react';
import Confetti from 'react-confetti';

const CommonConfetti = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return (
        <div>
            <Confetti width={width} height={height}
                recycle={false}
                numberOfPieces={500}

            />
        </div>
    );
};

export default CommonConfetti;