import Button from '../components/Button';
import sys1 from '../assets/images/sys1.jpg';
import sys2 from '../assets/images/sys2.jpg';
import sys4 from '../assets/images/sys4.png';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';

const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="relative min-h-[500px] border-y-2 border-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent to-zinc-50">
                <div className="absolute inset-0 top-0 left-0 right-0 bottom-0">
                    <SmokeBackground smokeColor="#3B82F6" />
                </div>
                <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                            Hero Section
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                            Welcome to My Portfolio
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-white sm:text-base">
                            From concept to code, I create web solutions that deliver results.
                        </p>
                        <div className="mt-6">
                            <Button to="/about" variant="primary">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
                        <div className="relative h-64 overflow-hidden rounded-[1.25rem] bg-zinc-200">
                            <img src="/src/assets/images/setup.jpg" alt="Setup" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Summary
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">8</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Projects
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">10</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500"> 
                            Programming Languages
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">Web and Mobile Application</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Specialization
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">National University</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            University
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">3rd Year</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            College Year
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Feature Cards
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Featured Projects
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img src={sys1} alt="Feature Card One" className="w-full aspect-4/3 h-auto rounded-[1.25rem] object-cover" />
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">Prettiest E-commerce Website </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            A modern fashion e-commerce website designed to showcase stylish apparel with a clean user interface, interactive product browsing, and a seamless shopping experience from selection to checkout.
                        </p>
                        <Button className="mt-4" variant="primary text-black">
                            View More
                        </Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img src={sys2} alt="Feature Card Two" className="w-full aspect-4/3 h-auto rounded-[1.25rem] object-cover" />
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">RENTIFY Rental Service Website </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            A web-based rental platform that allows users to browse available items, book rentals, and upload required documents, while providing administrators with tools to manage listings, availability, and transactions efficiently.
                        </p>
                        <Button className="mt-4" variant="primary text-black">
                            View More
                        </Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img src={sys4} alt="Feature Card Three" className="w-full aspect-4/3 rounded-[1.25rem] object-cover" />
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">InBlend E-commerce Website</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            An intuitive e-commerce platform focused on delivering a smooth and engaging shopping experience, featuring organized product displays, user-friendly navigation, and an integrated system for managing orders and inventory.
                        </p>
                        <Button className="mt-4 " variant="primary text-black">
                            View More
                        </Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
