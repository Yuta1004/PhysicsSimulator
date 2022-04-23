FROM rust:1.60.0

WORKDIR /workdir

COPY ./Cargo.toml ./Cargo.toml

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh &&\
    mkdir src &&\
    touch src/lib.rs &&\
    rustup target add wasm32-unknown-unknown &&\
    cargo build
