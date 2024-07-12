.PHONY: build-vendor
build-vendor:
	@rm -rf third_party
	@mkdir third_party
	@cd third_party && git clone git@github.com:googleapis/googleapis.git --depth=1 && cd ..
	@rm -rf vendor
	@mkdir vendor
	@protoc \
	  --js_out=import_style=commonjs,binary:vendor \
		-I third_party/googleapis \
		third_party/googleapis/google/api/http.proto third_party/googleapis/google/api/annotations.proto
	@rm -rf third_party
