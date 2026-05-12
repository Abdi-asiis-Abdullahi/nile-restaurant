import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <img
        src={heroImage}
        alt="Nile Restaurant — Premium dining experience"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Light premium overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="container relative z-10 text-center py-32 animate-float-in">
        <p className="uppercase tracking-[0.3em] text-primary text-xs md:text-sm mb-6">
          Nile Restaurant
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">
          Taste the <span className="text-gradient-gold">Excellence</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-lg text-white/90 mb-10">
          Fresh dishes, premium desserts and signature drinks — crafted with care and served with style.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="gradient-gold text-primary-foreground hover:opacity-90 shadow-gold font-semibold"
          >
            <a href="#menu">View Menu</a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            <a href="#menu">Order Now</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;