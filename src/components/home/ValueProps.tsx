import { Container } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  HeartIcon,
  GemIcon,
  GiftIcon,
  SparkleIcon,
} from "@/components/ui/icons";

const VALUES = [
  { icon: HeartIcon, label: "Handmade", detail: "with love" },
  { icon: GemIcon, label: "Quality materials", detail: "that last" },
  { icon: GiftIcon, label: "Beautifully packaged", detail: "& gift ready" },
  { icon: SparkleIcon, label: "Made to inspire", detail: "& empower" },
];

export default function ValueProps() {
  return (
    <Container>
      <Stagger className="grid grid-cols-2 gap-x-4 gap-y-8 rounded-[2.5rem] border border-ink/10 px-6 py-10 md:grid-cols-4 md:px-10">
        {VALUES.map(({ icon: Icon, label, detail }) => (
          <StaggerItem
            key={label}
            className="flex flex-col items-center gap-3 text-center md:flex-row md:gap-4 md:text-left"
          >
            <Icon size={30} className="shrink-0 text-mauve-deep" />
            <p className="text-[0.7rem] leading-relaxed tracking-[0.16em] uppercase">
              {label}
              <br />
              {detail}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
