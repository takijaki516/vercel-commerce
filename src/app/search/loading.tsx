import { Grid } from "@/components/grid";

export default function Loading() {
  return (
    <Grid>
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return <Grid.Item key={index} className="animate-pulse" />;
        })}
    </Grid>
  );
}
