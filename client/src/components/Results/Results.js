import CollapseDiv from "../CollapseDiv/CollapseDiv"
import SimpleGrid from "../SimpleGrid/SimpleGrid";

const Results = ({ grid, results }) => {
    return (
        <>
        {Object.entries(results).map((entry, index) => 
            <CollapseDiv key={index} btnTitle={entry[0]} content={<SimpleGrid grid={grid} answer={entry[1]} />} />
        ) }
        </>
    );
}

export default Results